
import json
import os
import re
import ast
from pathlib import Path

import pandas as pd
from dotenv import load_dotenv


# --------------------------------------------------
# 1. Configuration
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

DATASET_DIR = BASE_DIR / "dataset"
OUTPUT_PATH = DATASET_DIR / "knowledge.json"

configured_files = os.getenv("DATASET_FILES", "").strip()

if configured_files:
    DATASET_FILES = [
        item.strip()
        for item in configured_files.split(",")
        if item.strip()
    ]
else:
    DATASET_FILES = [
        str(path.relative_to(BASE_DIR))
        for path in sorted(DATASET_DIR.iterdir())
        if path.is_file()
        and path.suffix.lower() in {".csv", ".txt"}
        and path.name.lower() != "knowledge.json"
    ]


QUESTION_COLUMNS = [
    "question", "questions", "query", "prompt",
    "problem", "question_text", "user_question",
    "instruction", "utterance", "input", "user_input"
]

ANSWER_COLUMNS = [
    "answer", "answers", "response", "solution",
    "explanation", "answer_text", "correct_answer",
    "output", "assistant_response", "completion",
    "target", "response_text"
]

CONTEXT_COLUMNS = [
    "context", "passage", "paragraph", "article",
    "background", "document", "source_text"
]

TITLE_COLUMNS = [
    "title", "book_title", "name", "topic",
    "concept", "subject_name", "heading"
]

DESCRIPTION_COLUMNS = [
    "description", "content", "text", "summary",
    "details", "definition", "abstract", "body"
]

MIN_QUESTION_LENGTH = 4
MIN_ANSWER_LENGTH = 5
MAX_QUESTION_LENGTH = 1000
MAX_ANSWER_LENGTH = 1500


# --------------------------------------------------
# 2. Helper functions
# --------------------------------------------------

def normalize_column(column):
    column = str(column).strip().lower()
    column = re.sub(r"[^a-z0-9]+", "_", column)
    return column.strip("_")


def find_column(columns, candidates):
    normalized = {
        normalize_column(column): column
        for column in columns
    }

    for candidate in candidates:
        key = normalize_column(candidate)

        if key in normalized:
            return normalized[key]

    return None


def clean_value(value):
    if value is None:
        return ""

    try:
        if pd.isna(value):
            return ""
    except (TypeError, ValueError):
        pass

    text = str(value)
    text = text.replace("\x00", "")
    text = re.sub(r"\s+", " ", text).strip()

    if text.lower() in {"nan", "none", "null", "n/a"}:
        return ""

    return text


def parse_nested_answer(value):
    """
    Extract answers from plain strings, lists, or nested JSON.

    Example:
    {"text": ["Inheritance allows one class to reuse another class."]}

    Returns an empty string if no usable answer is available.
    """

    value = clean_value(value)

    if not value:
        return ""

    try:
        parsed = json.loads(value)
    except (json.JSONDecodeError, TypeError):
        try:
            parsed = ast.literal_eval(value)
        except (ValueError, SyntaxError, TypeError):
            return value

    if isinstance(parsed, str):
        return clean_value(parsed)

    if isinstance(parsed, list):
        answers = []

        for item in parsed:
            answer = parse_nested_answer(item)

            if answer:
                answers.append(answer)

        return " ".join(answers[:3])

    if isinstance(parsed, dict):
        # Common SQuAD / Hugging Face answer structures.
        for key in ("text", "answer", "answers", "value"):
            if key in parsed:
                answer = parse_nested_answer(parsed[key])

                if answer:
                    return answer

    return ""


def detect_subject(row, columns, source_name):
    """Detect a subject from dataset columns or the filename."""

    normalized_columns = {
        normalize_column(column): column
        for column in columns
    }

    for name in ("subject", "category", "domain", "topic", "course"):
        column = normalized_columns.get(name)

        if column:
            value = clean_value(row[column])

            if value and len(value) < 100:
                return value

    subject_indicators = {
        "physics": "Physics",
        "chemistry": "Chemistry",
        "mathematics": "Mathematics",
        "biology": "Biology",
        "computer_science": "Computer Science",
        "programming": "Programming",
        "general_knowledge": "General Knowledge",
    }

    for column_name, subject in subject_indicators.items():
        column = normalized_columns.get(column_name)

        if column:
            value = clean_value(row[column]).lower()

            if value in {"1", "1.0", "true", "yes", "y"}:
                return subject

    filename = source_name.lower()

    if any(word in filename for word in (
        "physics", "jee", "neet", "squad", "science_exam"
    )):
        return "Science"

    if any(word in filename for word in ("biology", "bio")):
        return "Biology"

    if any(word in filename for word in ("chemistry", "chemical")):
        return "Chemistry"

    if any(word in filename for word in (
        "math", "algebra", "calculus"
    )):
        return "Mathematics"

    if any(word in filename for word in (
        "prog", "python", "code", "stack", "computer",
        "programming", "interview"
    )):
        return "Computer Science"

    if any(word in filename for word in (
        "human_chat", "conversation", "utterance",
        "dialogue", "dialog"
    )):
        return "Conversation"

    return "General"


def short_answer(text):
    """Clean and limit answer length without unnecessarily shortening it."""

    text = clean_value(text)

    if len(text) <= MAX_ANSWER_LENGTH:
        return text

    truncated = text[:MAX_ANSWER_LENGTH]

    sentence_end = max(
        truncated.rfind(". "),
        truncated.rfind("? "),
        truncated.rfind("! ")
    )

    if sentence_end >= MAX_ANSWER_LENGTH // 2:
        truncated = truncated[:sentence_end + 1]
    else:
        truncated = truncated.rsplit(" ", 1)[0]

    return truncated.strip()


def make_record(question, answer, subject, source):
    question = clean_value(question)
    answer = short_answer(answer)

    if len(question) < MIN_QUESTION_LENGTH:
        return None

    if len(answer) < MIN_ANSWER_LENGTH:
        return None

    if len(question) > MAX_QUESTION_LENGTH:
        question = question[:MAX_QUESTION_LENGTH].rstrip()

    if question.lower() in {
        "question", "questions", "input", "prompt",
        "user", "human", "assistant"
    }:
        return None

    return {
        "question": question,
        "answer": answer,
        "subject": clean_value(subject) or "General",
        "source": source
    }


# --------------------------------------------------
# 3. Read CSV safely
# --------------------------------------------------

def read_csv_safely(file_path):
    last_error = None

    for encoding in ("utf-8", "utf-8-sig", "cp1252", "latin1"):
        try:
            df = pd.read_csv(
                file_path,
                encoding=encoding,
                low_memory=False,
                on_bad_lines="skip"
            )

            print(f"Encoding used: {encoding}")
            return df

        except Exception as error:
            last_error = error

    raise ValueError(
        f"Unable to read {file_path.name}: {last_error}"
    )


# --------------------------------------------------
# 4. Process CSV datasets
# --------------------------------------------------

def process_csv(file_path):
    if not file_path.exists():
        print(f"WARNING: File not found: {file_path}")
        return []

    print(f"\nReading CSV: {file_path.name}")

    try:
        df = read_csv_safely(file_path)
    except Exception as error:
        print(f"ERROR: {error}")
        return []

    if df.empty:
        print("Skipped: CSV contains no usable rows.")
        return []

    df.columns = [
        str(column).strip()
        for column in df.columns
    ]

    print(f"Rows: {len(df)}")
    print(f"Columns: {list(df.columns)}")

    question_col = find_column(
        df.columns, QUESTION_COLUMNS
    )

    answer_col = find_column(
        df.columns, ANSWER_COLUMNS
    )

    context_col = find_column(
        df.columns, CONTEXT_COLUMNS
    )

    title_col = find_column(
        df.columns, TITLE_COLUMNS
    )

    description_col = find_column(
        df.columns, DESCRIPTION_COLUMNS
    )

    records = []

    for _, row in df.iterrows():
        subject = detect_subject(
            row,
            df.columns,
            file_path.name
        )

        question = (
            clean_value(row[question_col])
            if question_col else ""
        )

        answer = (
            parse_nested_answer(row[answer_col])
            if answer_col else ""
        )

        context = (
            clean_value(row[context_col])
            if context_col else ""
        )

        title = (
            clean_value(row[title_col])
            if title_col else ""
        )

        description = (
            clean_value(row[description_col])
            if description_col else ""
        )

        # ------------------------------------------
        # Case 1: A real question and answer exist.
        # ------------------------------------------

        if question and answer:
            record = make_record(
                question,
                answer,
                subject,
                file_path.name
            )

            if record:
                records.append(record)

            continue

        # ------------------------------------------
        # Case 2: A question exists, but the answer
        # is missing. Do not return the full context
        # as though it were the answer.
        # ------------------------------------------

        if question and context:
            continue

        # ------------------------------------------
        # Case 3: Educational content with a title
        # and actual description.
        # ------------------------------------------

        content = description or context

        if title and content:
            record = make_record(
                f"What is {title}?",
                content,
                subject,
                file_path.name
            )

            if record:
                records.append(record)

            record = make_record(
                f"Explain {title}.",
                content,
                subject,
                file_path.name
            )

            if record:
                records.append(record)

            continue

        # ------------------------------------------
        # Case 4: Content with no explicit question.
        # Generate a topic question only if the title
        # provides a meaningful topic.
        # ------------------------------------------

        if content and title:
            record = make_record(
                f"What is {title}?",
                content,
                subject,
                file_path.name
            )

            if record:
                records.append(record)

    print(f"Generated records: {len(records)}")
    return records


# --------------------------------------------------
# 5. Process TXT conversation datasets
# --------------------------------------------------

def process_txt(file_path):
    if not file_path.exists():
        print(f"WARNING: File not found: {file_path}")
        return []

    print(f"\nReading text: {file_path.name}")

    text = ""

    for encoding in ("utf-8", "utf-8-sig", "cp1252", "latin1"):
        try:
            text = file_path.read_text(encoding=encoding)
            break
        except UnicodeDecodeError:
            continue

    if not text.strip():
        print("Skipped: Text file is empty.")
        return []

    records = []
    lines = [
        line.strip()
        for line in text.splitlines()
        if line.strip()
    ]

    # Handle labelled dialogue:
    # Human: Hello
    # Assistant: Hi there

    user_labels = {
        "human", "user", "person 1", "speaker 1"
    }

    assistant_labels = {
        "assistant", "bot", "person 2", "speaker 2"
    }

    labelled_lines = []

    for line in lines:
        match = re.match(
            r"^(human|user|person\s*1|speaker\s*1|"
            r"assistant|bot|person\s*2|speaker\s*2)"
            r"\s*:\s*(.+)$",
            line,
            flags=re.IGNORECASE
        )

        if match:
            speaker = re.sub(
                r"\s+", " ", match.group(1).lower()
            )
            message = clean_value(match.group(2))
            labelled_lines.append((speaker, message))

    if labelled_lines:
        pending_question = ""

        for speaker, message in labelled_lines:
            if speaker in user_labels:
                pending_question = message

            elif speaker in assistant_labels and pending_question:
                record = make_record(
                    pending_question,
                    message,
                    "Conversation",
                    file_path.name
                )

                if record:
                    records.append(record)

                pending_question = ""

    else:
        # Only use alternating lines as a fallback for files
        # that appear to contain conversation data.
        filename = file_path.name.lower()

        is_conversation_file = any(
            word in filename
            for word in (
                "chat", "conversation", "dialog", "utterance"
            )
        )

        if is_conversation_file:
            for index in range(0, len(lines) - 1, 2):
                record = make_record(
                    lines[index],
                    lines[index + 1],
                    "Conversation",
                    file_path.name
                )

                if record:
                    records.append(record)

    print(f"Generated conversation records: {len(records)}")
    return records


# --------------------------------------------------
# 6. Prepare and combine the knowledge base
# --------------------------------------------------

def prepare_dataset():
    all_records = []

    for item in DATASET_FILES:
        file_path = Path(item)

        if not file_path.is_absolute():
            file_path = BASE_DIR / file_path

        suffix = file_path.suffix.lower()

        if suffix == ".csv":
            all_records.extend(process_csv(file_path))

        elif suffix == ".txt":
            all_records.extend(process_txt(file_path))

        else:
            print(f"Skipped unsupported file: {file_path.name}")

    if not all_records:
        raise ValueError(
            "No question-answer records were generated. "
            "Check dataset paths and column names."
        )

    # Remove exact duplicate question-answer pairs.
    # Preserve different answers to the same question.
    unique_records = []
    seen = set()

    for record in all_records:
        question = clean_value(record["question"])
        answer = clean_value(record["answer"])

        key = (
            question.casefold(),
            answer.casefold()
        )

        if key in seen:
            continue

        seen.add(key)

        unique_records.append({
            "question": question,
            "answer": answer,
            "subject": record["subject"],
            "source": record["source"]
        })

    DATASET_DIR.mkdir(parents=True, exist_ok=True)

    with OUTPUT_PATH.open("w", encoding="utf-8") as file:
        json.dump(
            unique_records,
            file,
            ensure_ascii=False,
            indent=2
        )

    print("\n" + "=" * 45)
    print("DATASET PREPARATION COMPLETED")
    print("=" * 45)
    print(f"Total records: {len(unique_records)}")
    print(f"Saved to: {OUTPUT_PATH}")

    print("\nRecords by source:")

    source_counts = {}

    for record in unique_records:
        source = record["source"]
        source_counts[source] = source_counts.get(source, 0) + 1

    for source, count in sorted(source_counts.items()):
        print(f"  {source}: {count}")

    print("\nRecords by subject:")

    subject_counts = {}

    for record in unique_records:
        subject = record["subject"]
        subject_counts[subject] = (
            subject_counts.get(subject, 0) + 1
        )

    for subject, count in sorted(subject_counts.items()):
        print(f"  {subject}: {count}")


# --------------------------------------------------
# 7. Entry point
# --------------------------------------------------

if __name__ == "__main__":
    prepare_dataset()
