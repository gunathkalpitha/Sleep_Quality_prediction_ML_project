from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI(title="Sleep Quality Predictor API")

# ── CORS (allow React frontend) ──────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Load Models ──────────────────────────────────────
BASE_DIR   = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, '..', 'models')

svm_model = joblib.load(os.path.join(MODELS_DIR, 'svm_model.pkl'))
rf_model  = joblib.load(os.path.join(MODELS_DIR, 'rf_model.pkl'))
scaler    = joblib.load(os.path.join(MODELS_DIR, 'scaler.pkl'))

print("✅ Models loaded successfully!")

# ── Label Map ────────────────────────────────────────
LABELS = {0: 'Poor', 1: 'Fair', 2: 'Good'}

# ── Encoding Maps ────────────────────────────────────
GENDER_MAP = {
    'Male':   1,
    'Female': 0
}

OCCUPATION_MAP = {
    'Accountant':           0,
    'Doctor':               1,
    'Engineer':             2,
    'Lawyer':               3,
    'Manager':              4,
    'Nurse':                5,
    'Sales Representative': 6,
    'Salesperson':          7,
    'Scientist':            8,
    'Software Engineer':    9,
    'Teacher':              10,
    'Unemployed':           11
}

BMI_MAP = {
    'Normal':       0,
    'Normal Weight':1,
    'Obese':        2,
    'Overweight':   3
}

DISORDER_MAP = {
    'None':         0,
    'Insomnia':     1,
    'Sleep Apnea':  2
}

# ── Request Schema ───────────────────────────────────
class SleepData(BaseModel):
    gender:             str
    age:                int
    occupation:         str
    sleep_duration:     float
    physical_activity:  int
   
    bmi_category:       str
    heart_rate:         int
    daily_steps:        int
    sleep_disorder:     str
    systolic_bp:        int
    diastolic_bp:       int

# ── Helper: encode + build feature array ─────────────
def build_features(data: SleepData):
    return np.array([[
        GENDER_MAP.get(data.gender, 1),
        data.age,
        OCCUPATION_MAP.get(data.occupation, 11),
        data.sleep_duration,
        data.physical_activity,
        
        BMI_MAP.get(data.bmi_category, 0),
        data.heart_rate,
        data.daily_steps,
        DISORDER_MAP.get(data.sleep_disorder, 0),
        data.systolic_bp,
        data.diastolic_bp
    ]])

# ── Routes ───────────────────────────────────────────

@app.get("/")
def root():
    return {"message": "Sleep Quality Predictor API is running! ✅"}

@app.post("/predict")
def predict(data: SleepData):
    # Build feature array
    features = build_features(data)
    features_11 = features[:, :11]  # Only use first 11 features

    # Scale for SVM
    features_scaled = scaler.transform(features_11)

    # Predictions
    svm_pred = svm_model.predict(features_scaled)[0]
    rf_pred  = rf_model.predict(features_11)[0]

    # Probabilities
    svm_proba = svm_model.predict_proba(features_scaled)[0] if hasattr(svm_model, 'predict_proba') else None
    rf_proba  = rf_model.predict_proba(features_11)[0]

    return {
        "svm": {
            "prediction": LABELS[svm_pred],
            "score":      int(svm_pred),
            "confidence": round(float(max(svm_proba)) * 100, 2) if svm_proba is not None else None
        },
        "random_forest": {
            "prediction": LABELS[rf_pred],
            "score":      int(rf_pred),
            "confidence": round(float(max(rf_proba)) * 100, 2)
        },
        "agreement": LABELS[svm_pred] == LABELS[rf_pred],
        "final_prediction": LABELS[svm_pred]  # SVM as primary model
    }