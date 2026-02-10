import warnings
import sklearn
# Suppress all sklearn UserWarnings about feature names
warnings.filterwarnings(
    "ignore",
    r"X does not have valid feature names, but .+ was fitted with feature names",
    category=UserWarning,
    module=r"sklearn"
)
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

# Correct CSV path for loading data
CSV_PATH = r'E:/Projects/Sem5/ML/Sleep-Quality-ML/data/Sleep_health_and_lifestyle_dataset.csv'

# Load the dataset
try:
    df = pd.read_csv(CSV_PATH)
except FileNotFoundError:
    df = None
    print(f"CSV file not found at {CSV_PATH}. Please check the path.")

app = FastAPI()

# Allow your React app (localhost:5173) to talk to this Python server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For localhost development, "*" is easiest
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your 96.30% accurate model and scaler
model = joblib.load('../models/sleep_quality_model.pkl')
scaler = joblib.load('../models/scaler.pkl')
print("Scaler loaded:", scaler)
print("Model loaded:", model)

# Define what the input data looks like
class SleepData(BaseModel):
    gender: int
    age: int
    occupation: int
    sleep_duration: float
    physical_activity: int
    bmi: int
    heart_rate: int
    daily_steps: int
    disorder: int
    systolic: int
    diastolic: int

@app.post("/predict")
async def predict_sleep(request: Request):
    try:
        data = await request.json()
        print("Received data:", data)
        # Validate all required fields
        required_fields = [
            "gender", "age", "occupation", "sleep_duration", "physical_activity",
            "bmi", "heart_rate", "daily_steps", "disorder", "systolic", "diastolic"
        ]
        for field in required_fields:
            if field not in data:
                return {"error": f"Missing field: {field}"}
            columns = [
                "Gender", "Age", "Occupation", "Sleep Duration", "Physical Activity Level",
                "BMI Category", "Heart Rate", "Daily Steps", "Sleep Disorder", "Systolic", "Diastolic"
            ]
            # Use numeric codes for all columns, matching scaler/model training
            input_row = [
                int(data["gender"]),
                int(data["age"]),
                int(data["occupation"]),
                float(data["sleep_duration"]),
                int(data["physical_activity"]),
                float(data["bmi"]),
                int(data["heart_rate"]),
                int(data["daily_steps"]),
                int(data["disorder"]),
                int(data["systolic"]),
                int(data["diastolic"])
            ]
            input_df = pd.DataFrame([input_row], columns=columns)
            # Pass DataFrame directly to scaler and model
            scaled_data = scaler.transform(input_df.values)
            prediction = model.predict(scaled_data)
        # Get prediction probability/confidence if supported
        # Always map prediction to result
        categories = {4: "Poor", 5: "Poor", 6: "Fair", 7: "Good", 8: "Good", 9: "Excellent"}
        result = categories.get(int(prediction[0]), "Unknown")
        # Try to get confidence
        try:
            proba = model.predict_proba(scaled_data)
            confidence = float(proba.max())
        except Exception:
            confidence = None
        response = {"prediction": result}
        if confidence is not None:
            response["confidence"] = round(confidence, 4)
        return response
    except Exception as e:
        print("Error in /predict:", e)
        return {"error": str(e), "details": "Ensure all fields are present and numeric. See server logs for more info."}