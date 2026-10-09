
import json
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# --------------------------------------------------
# 1. Load environment variables
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

KNOWLEDGE_PATH = BASE_DIR / "dataset" / "knowledge.json"

THRESHOLD = float(
    os.getenv("SIMILARITY_THRESHOLD", "0.15")
)


# --------------------------------------------------
# 2. Initialize FastAPI
# --------------------------------------------------

app = FastAPI(
    title="Study Spark AI Chatbot",
    description="Educational question-answer retrieval API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# --------------------------------------------------
# 3. Request validation
# --------------------------------------------------

class ChatRequest(BaseModel):
    input: str = Field(min_length=1, max_length=2000)


# --------------------------------------------------
# 4. Load knowledge and build the search index
# --------------------------------------------------

def load_knowledge():
    if not KNOWLEDGE_PATH.exists():
        raise RuntimeError(
            f"Knowledge file not found: {KNOWLEDGE_PATH}\n"
            "Run prepare_data.py first."
        )

    with open(
        KNOWLEDGE_PATH,
        "r",
        encoding="utf-8"
    ) as file:
        records = json.load(file)

    if not isinstance(records, list) or not records:
        raise RuntimeError(
            "knowledge.json must contain a non-empty JSON list."
        )

    # Validate and clean records
    valid_records = []

    for item in records:
        if not isinstance(item, dict):
            continue

        question = str(item.get("question", "")).strip()
        answer = str(item.get("answer", "")).strip()

        if question and answer:
            valid_records.append({
                **item,
                "question": question,
                "answer": answer
            })

    if not valid_records:
        raise RuntimeError(
            "No valid question-answer records found in knowledge.json."
        )

    questions = [
        record["question"]
        for record in valid_records
    ]

    # Create the TF-IDF text index
    vectorizer = TfidfVectorizer(
        lowercase=True,
        strip_accents="unicode",
        ngram_range=(1, 2),
        sublinear_tf=True,
        stop_words="english"
    )

    try:
        question_matrix = vectorizer.fit_transform(questions)
    except ValueError as error:
        raise RuntimeError(
            "Could not build the search index. "
            "Check whether your dataset contains meaningful text."
        ) from error

    return valid_records, vectorizer, question_matrix


# --------------------------------------------------
# 5. Initialize chatbot
# --------------------------------------------------

records, vectorizer, question_matrix = load_knowledge()

print("----------------------------------------")
print("Study Spark AI Chatbot is ready!")
print(f"Knowledge records: {len(records)}")
print(f"Knowledge file: {KNOWLEDGE_PATH}")
print("----------------------------------------")


# --------------------------------------------------
# 6. Home route
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "success": True,
        "message": "Study Spark AI service is running."
    }


# --------------------------------------------------
# 7. Health check
# --------------------------------------------------

@app.get("/health")
def health():
    return {
        "success": True,
        "service": "Study Spark AI Chatbot",
        "dataset_records": len(records),
        "status": "ready"
    }


# --------------------------------------------------
# 8. Chat endpoint
# --------------------------------------------------

@app.post("/chat")
def chat(request: ChatRequest):
    user_input = request.input.strip()

    if not user_input:
        raise HTTPException(
            status_code=400,
            detail="Please enter a question."
        )

    try:
        # Convert the user's question into TF-IDF features
        query_vector = vectorizer.transform([user_input])

        # Compare it with all dataset questions
        similarities = cosine_similarity(
            query_vector,
            question_matrix
        ).flatten()

        best_index = int(similarities.argmax())
        best_score = float(similarities[best_index])

        # No sufficiently relevant result
        if best_score < THRESHOLD:
            return {
                "success": True,
                "answer": (
                    "I couldn't find a relevant answer in my "
                    "educational knowledge base. Please try "
                    "rephrasing your question or asking about "
                    "another study topic."
                ),
                "matched": False,
                "similarity": round(best_score, 4)
            }

        matched_record = records[best_index]

        return {
            "success": True,
            "answer": matched_record["answer"],
            "matched_question": matched_record["question"],
            "subject": matched_record.get("subject", ""),
            "source": matched_record.get("source", ""),
            "matched": True,
            "similarity": round(best_score, 4)
        }

    except Exception as error:
        print(f"Chat processing error: {error}")

        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your question."
        )