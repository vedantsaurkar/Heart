from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
import joblib
import numpy as np
import os

app = FastAPI(title="Heart Disease Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "heart_model.pkl"
)

model = joblib.load(MODEL_PATH)

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


@app.post("/")
@app.post("/predict")
@app.post("/api/predict")
def predict(data: dict):
    try:
        values = [float(data[feature]) for feature in FEATURES]

        X = np.array([values])

        prediction = int(model.predict(X)[0])

        probability = float(
            model.predict_proba(X)[0][1] * 100
        )

        return {
            "prediction": prediction,
            "result": (
                "Heart Disease Detected"
                if prediction == 1
                else "No Heart Disease Detected"
            ),
            "probability": round(probability, 2)
        }

    except KeyError as e:
        raise HTTPException(
            status_code=400,
            detail=f"Missing feature: {e.args[0]}"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )