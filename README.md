# Heart Disease Prediction

Machine-learning web application using the supplied heart.csv dataset.

## Dataset
- Rows: 1025
- Input features: 13
- Target: target
- Missing values: none

## Features
age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal

## Local setup

### 1. Train the model
Create a Python environment and install:

pip install -r api/requirements.txt pandas

Then run:

python train_model.py

This creates model/heart_model.pkl.

### 2. Install frontend
npm install

### 3. Run
npm run dev

Open http://localhost:3000

## Vercel
Push the complete project to GitHub and import the repository into Vercel.

The Python prediction endpoint is:
POST /api/predict

## Medical disclaimer
This project is an educational machine-learning application and is not a medical diagnostic device.
"# Heart" 
