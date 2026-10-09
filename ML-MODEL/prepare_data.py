
import json
import os
import re
from pathlib import Path

import pandas as pd
from dotenv import load_dotenv

# --------------------------------------------------
# Configuration
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

DATASET_DIR = BASE_DIR / "dataset"
OUTPUT_PATH = DATASET_DIR / "knowledge.json"

DATASET_FILES = os.getenv(
    "DATASET_FILES",
    "dataset/prog_book.csv,dataset/Subject_Data.csv"
).split(",")

QUESTION_COLUMNS = [
    "question", "questions", "query", "prompt",
    "problem", "question_text", "user_question"
]

ANSWER_COLUMNS = [
    "answer", "answers", "response", "solution",
    "explanation", "answer_text", "correct_answer"
]

TITLE_COLUMNS = [
    "title", "titile", "book_title", "name",
    "topic", "concept", "subject_name"
]

DESCRIPTION_COLUMNS = [
    "description", "content", "text", "summary",
    "details", "definition", "abstract"
]

SUBJECT_NAMES = [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Computer Science"
]


# --------------------------------------------------
# Helpers
# --------------------------------------------------

def normalize_column(column):
    return (
        str(column)
        .strip()
        .lower()
        .replace(" ", "_")
        .replace("-", "_")
    )


def find_column(columns, candidates):
    normalized = {
        normalize_column(column): column
        for column in columns
    }

    for candidate in candidates:
        if candidate in normalized:
            return normalized[candidate]

    return None


def clean_value(value):
    if pd.isna(value):
        return ""

    return re.sub(r"\s+", " ", str(value)).strip()


def read_csv_safely(file_path):
    for encoding in ("utf-8", "utf-8-sig", "cp1252", "latin1"):
        try:
            df = pd.read_csv(
                file_path,
                encoding=encoding,
                low_memory=False
            )
            print(f"Encoding used: {encoding}")
            return df
        except UnicodeDecodeError:
            continue

    raise ValueError(f"Unable to decode {file_path.name}")


def detect_subject(row, columns):
    """Detect subject labels stored as indicator columns."""

    normalized_columns = {
        normalize_column(column): column
        for column in columns
    }

    subjects = []

    for subject_name in SUBJECT_NAMES:
        key = normalize_column(subject_name)
        column = normalized_columns.get(key)

        if column is None:
            continue

        value = clean_value(row[column]).lower()

        # Support common binary indicator values.
        if value in {"1", "1.0", "true", "yes", "y"}:
            subjects.append(subject_name)

    return ", ".join(subjects)


def split_into_sentences(text):
    """Split text into sentence-like pieces."""

    text = re.sub(r"\s+", " ", text).strip()

    if not text:
        return []

    # Protect common abbreviations and decimal numbers.
    text = re.sub(r"(?<=\d)\.(?=\d)", "<DOT>", text)

    parts = re.split(r"(?<=[.!?])\s+", text)
    parts = [
        part.replace("<DOT>", ".").strip()
        for part in parts
    ]

    return [part for part in parts if part]


def short_answer(text, max_sentences=2, max_chars=450):
    """
    Produce a concise extractive answer.
    This selects existing sentences; it does not invent facts.
    """

    text = re.sub(r"\s+", " ", text).strip()
    sentences = split_into_sentences(text)

    if not sentences:
        return text[:max_chars].strip()

    result = " ".join(sentences[:max_sentences])

    if len(result) > max_chars:
        result = result[:max_chars].rsplit(" ", 1)[0].rstrip(" ,;:")

        if result and result[-1] not in ".!?":
            result += "..."

    return result


def make_record(question, answer, subject, source):
    question = question.strip()
    answer = short_answer(answer)

    if not question or not answer:
        return None

    return {
        "question": question,
        "answer": answer,
        "subject": subject,
        "source": source
    }


# --------------------------------------------------
# Process one CSV
# --------------------------------------------------

def process_csv(file_path):
    if not file_path.exists():
        print(f"WARNING: File not found: {file_path}")
        return []

    print(f"\nReading: {file_path.name}")

    try:
        df = read_csv_safely(file_path)
    except Exception as error:
        print(f"ERROR: {error}")
        return []

    df.columns = [str(column).strip() for column in df.columns]

    print(f"Columns: {list(df.columns)}")
    print(f"Rows: {len(df)}")

    question_col = find_column(df.columns, QUESTION_COLUMNS)
    answer_col = find_column(df.columns, ANSWER_COLUMNS)
    title_col = find_column(df.columns, TITLE_COLUMNS)
    description_col = find_column(df.columns, DESCRIPTION_COLUMNS)

    records = []

    for _, row in df.iterrows():
        values = {
            column: clean_value(row[column])
            for column in df.columns
            if clean_value(row[column])
        }

        if not values:
            continue

        subject = detect_subject(row, df.columns)

        # Case 1: A proper question-answer dataset.
        if (
            question_col
            and answer_col
            and question_col != answer_col
        ):
            question = values.get(question_col, "")
            answer = values.get(answer_col, "")

            record = make_record(
                question, answer, subject, file_path.name
            )

            if record:
                records.append(record)

            continue

        # Case 2: Educational passage dataset.
        title = values.get(title_col, "") if title_col else ""
        content = (
            values.get(description_col, "")
            if description_col
            else ""
        )

        if content:
            # Create a general question for the passage.
            topic = title or subject or "this topic"

            record = make_record(
                f"Explain {topic}",
                content,
                subject,
                file_path.name
            )

            if record:
                records.append(record)

            # Create additional questions from topic headings
            # found inside longer passages.
            headings = [
                "What is Work?",
                "What is Energy?",
                "Kinetic Energy:",
                "Translational Kinetic Energy:",
                "Rotational Kinetic Energy:",
                "Work-Energy Theorem",
                "Power",
                "Units of Power"
            ]

            for heading in headings:
                heading_text = heading.rstrip(":")
                pattern = re.compile(
                    re.escape(heading_text),
                    re.IGNORECASE
                )

                match = pattern.search(content)

                if not match:
                    continue

                start = match.start()
                next_heading_positions = [
                    found.start()
                    for other in headings
                    if other.lower() != heading.lower()
                    for found in re.finditer(
                        re.escape(other.rstrip(":")),
                        content[start + len(heading_text):],
                        re.IGNORECASE
                    )
                ]

                if next_heading_positions:
                    end = (
                        start + len(heading_text)
                        + min(next_heading_positions)
                    )
                    section = content[start:end]
                else:
                    section = content[start:]

                section = section.strip(" .:\n")

                if len(section) < 25:
                    continue

                record = make_record(
                    f"What is {heading_text.lower()}?",
                    section,
                    subject,
                    file_path.name
                )

                if record:
                    records.append(record)

        elif title:
            # Case 3: Book catalogue.
            description = values.get(
                find_column(df.columns, ["description"]), ""
            )

            book_title = title

            if description:
                answer = description
            else:
                answer = (
                    f"{book_title} is a book listed in the "
                    f"programming book dataset."
                )

            record = make_record(
                f"What is {book_title} about?",
                answer,
                subject or "Computer Science",
                file_path.name
            )

            if record:
                records.append(record)

    print(f"Generated records: {len(records)}")
    return records


# --------------------------------------------------
# Prepare combined knowledge base
# --------------------------------------------------

def prepare_dataset():
    all_records = []

    for item in DATASET_FILES:
        item = item.strip()

        if not item:
            continue

        file_path = Path(item)

        if not file_path.is_absolute():
            file_path = BASE_DIR / file_path

        all_records.extend(process_csv(file_path))

    if not all_records:
        raise ValueError(
            "No usable records found. Check your dataset files."
        )

    unique_records = []
    seen = set()

    for record in all_records:
        question = record["question"].strip()
        answer = record["answer"].strip()

        key = question.casefold()

        if not question or not answer or key in seen:
            continue

        seen.add(key)

        unique_records.append({
            **record,
            "question": question,
            "answer": answer
        })

    DATASET_DIR.mkdir(parents=True, exist_ok=True)

    with open(OUTPUT_PATH, "w", encoding="utf-8") as file:
        json.dump(
            unique_records,
            file,
            ensure_ascii=False,
            indent=2
        )

    print("\nDataset preparation completed.")
    print(f"Total records: {len(unique_records)}")
    print(f"Saved to: {OUTPUT_PATH}")

    print("\nRecords by source:")

    for source in sorted({
        record["source"] for record in unique_records
    }):
        count = sum(
            record["source"] == source
            for record in unique_records
        )
        print(f"{source}: {count}")


if __name__ == "__main__":
    prepare_dataset()