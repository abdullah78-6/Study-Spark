
import json
import os
import re
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# --------------------------------------------------
# Configuration
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

KNOWLEDGE_PATH = BASE_DIR / "dataset" / "knowledge.json"

# Start conservatively. Calibrate this using your own test questions.
THRESHOLD = float(os.getenv("SIMILARITY_THRESHOLD", "0.22"))

app = FastAPI(
    title="Study Spark AI Chatbot",
    description="Educational question-answer retrieval API",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    input: str = Field(min_length=1, max_length=2000)


# --------------------------------------------------
# Direct responses for common conversation
# --------------------------------------------------

GREETINGS = {
    "hi": "Hello! Welcome to Study Spark. What would you like to learn today?",
    "hello": "Hello! Welcome to Study Spark. Ask me a question about programming, science, or another study topic.",
    "hey": "Hey! How can I help you with your studies today?",
    "good morning": "Good morning! What would you like to learn today?",
    "good afternoon": "Good afternoon! How can I help you study today?",
    "good evening": "Good evening! What topic can I help you with?",
    "thanks": "You're welcome! Feel free to ask another study question.",
    "thank you": "You're welcome! I'm happy to help you learn.",
    "bye": "Goodbye! Keep learning with Study Spark.",
    "goodbye": "Goodbye! Come back whenever you have a study question.",
    "how are you": "I'm ready to help you learn! What would you like to explore?",
    "who are you": "I'm Study Spark, an educational assistant that retrieves answers from my available knowledge base.",
    "what is your name": "I'm Study Spark, your educational learning assistant.",
}


def normalize_text(text):
    text = str(text).lower().strip()
    text = re.sub(r"[^a-z0-9\s+#.]"," ", text)
    return re.sub(r"\s+", " ", text).strip()


def get_direct_response(user_input):
    normalized = normalize_text(user_input)
    normalized = normalized.rstrip(" .!?")

    if normalized in GREETINGS:
        return GREETINGS[normalized]

    # Do not let a greeting be treated as an educational question.
    greeting_prefixes = (
        "hi ",
        "hello ",
        "hey ",
    )

    for prefix in greeting_prefixes:
        if normalized.startswith(prefix) and len(normalized.split()) <= 4:
            return GREETINGS[prefix.strip()]

    return None


# --------------------------------------------------
# Load and validate the knowledge base
# --------------------------------------------------

def load_knowledge():
    if not KNOWLEDGE_PATH.exists():
        raise RuntimeError(
            f"Knowledge file not found: {KNOWLEDGE_PATH}. "
            "Run prepare_data.py first."
        )

    with KNOWLEDGE_PATH.open("r", encoding="utf-8") as file:
        data = json.load(file)

    if not isinstance(data, list) or not data:
        raise RuntimeError(
            "knowledge.json must contain a non-empty JSON list."
        )

    valid_records = []
    seen = set()

    for item in data:
        if not isinstance(item, dict):
            continue

        question = str(item.get("question", "")).strip()
        answer = str(item.get("answer", "")).strip()

        if len(question) < 4 or len(answer) < 5:
            continue

        # Remove exact duplicate question-answer pairs.
        key = (question.casefold(), answer.casefold())

        if key in seen:
            continue

        seen.add(key)

        valid_records.append({
            "question": question,
            "answer": answer,
            "subject": str(item.get("subject", "General")),
            "source": str(item.get("source", "")),
        })

    if not valid_records:
        raise RuntimeError("No usable question-answer records were found.")

    return valid_records


records = load_knowledge()
questions = [record["question"] for record in records]

# Word features handle meaningful word overlap and phrases.
word_vectorizer = TfidfVectorizer(
    lowercase=True,
    strip_accents="unicode",
    ngram_range=(1, 2),
    sublinear_tf=True,
    max_features=300000,
)

# Character features can help with spelling variations and typos.
char_vectorizer = TfidfVectorizer(
    analyzer="char_wb",
    lowercase=True,
    ngram_range=(3, 5),
    sublinear_tf=True,
    max_features=300000,
)

try:
    word_matrix = word_vectorizer.fit_transform(questions)
    char_matrix = char_vectorizer.fit_transform(questions)
except ValueError as error:
    raise RuntimeError(
        "Unable to create the search index. Check knowledge.json."
    ) from error


print("=" * 45)
print("Study Spark AI is ready")
print(f"Knowledge records: {len(records)}")
print(f"Similarity threshold: {THRESHOLD}")
print("=" * 45)


# --------------------------------------------------
# Routes
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "success": True,
        "message": "Study Spark AI service is running.",
    }


@app.get("/health")
def health():
    return {
        "success": True,
        "service": "Study Spark AI Chatbot",
        "dataset_records": len(records),
        "status": "ready",
    }


@app.post("/chat")
def chat(request: ChatRequest):
    user_input = request.input.strip()

    if not user_input:
        raise HTTPException(
            status_code=400,
            detail="Please enter a question.",
        )

    try:
        # Answer common conversational messages directly.
        direct_answer = get_direct_response(user_input)

        if direct_answer:
            return {
                "success": True,
                "answer": direct_answer,
                "matched": True,
                "type": "conversation",
                "similarity": 1.0,
            }

        # Compare the question against the knowledge base.
        word_query = word_vectorizer.transform([user_input])
        char_query = char_vectorizer.transform([user_input])

        word_scores = cosine_similarity(
            word_query, word_matrix
        ).ravel()

        char_scores = cosine_similarity(
            char_query, char_matrix
        ).ravel()

        # Combined retrieval score.
        scores = (0.75 * word_scores) + (0.25 * char_scores)

        best_index = int(scores.argmax())
        best_score = float(scores[best_index])

        matched_record = records[best_index]

        # Log the best result while debugging locally.
        print(
            f"Question: {user_input!r} | "
            f"Best match: {matched_record['question']!r} | "
            f"Score: {best_score:.4f}"
        )

        # Reject weak matches rather than returning unrelated answers.
        if best_score < THRESHOLD:
            return {
                "success": True,
                "answer": (
                    "I couldn't find a sufficiently relevant answer "
                    "in my current knowledge base. Try asking with "
                    "more details, or use a question about a topic "
                    "covered by Study Spark."
                ),
                "matched": False,
                "similarity": round(best_score, 4),
            }

        return {
            "success": True,
            "answer": matched_record["answer"],
            "matched_question": matched_record["question"],
            "subject": matched_record["subject"],
            "source": matched_record["source"],
            "matched": True,
            "similarity": round(best_score, 4),
        }

    except HTTPException:
        raise

    except Exception as error:
        print(f"Chat processing error: {error}")

        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your question.",
        )
