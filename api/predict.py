from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
import os

app = FastAPI(title="Heart Disease Prediction API")

# Allow the Next.js frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Project root
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Model path
MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "heart_model.pkl"
)

# Load trained model
model = joblib.load(MODEL_PATH)

# Features must be in exactly this order
FEATURES = [
    "age",
    "sex",
    "cp",
    "trestbps",
    "chol",
    "fbs",
    "restecg",
    "thalach",
    "exang",
    "oldpeak",
    "slope",
    "ca",
    "thal"
]


@app.get("/")
def home():
    return {
        "message": "Heart Disease Prediction API is running"
    }


@app.post("/predict")
def predict(data: dict):

    try:
        # Get values in the correct feature order
        values = [
            float(data[feature])
            for feature in FEATURES
        ]

        # Convert to numpy array
        X = np.array([values])

        # Prediction
        prediction = int(
            model.predict(X)[0]
        )

        # Probability
        probability = float(
            model.predict_proba(X)[0][1] * 100
        )

        if prediction == 1:
            result = "Heart Disease Detected"
        else:
            result = "No Heart Disease Detected"

        return {
            "prediction": prediction,
            "result": result,
            "probability": round(probability, 2)
        }

    except Exception as e:

        return {
            "error": str(e)
        }