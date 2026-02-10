# Sleep_Quality_prediction_ML_project


# Sleep Quality Prediction ML Project

This project predicts sleep quality categories (Poor, Fair, Good, Excellent) using lifestyle and physiological data. It features a fully integrated ML pipeline with:

- **Balanced dataset:** Classes are equalized using SMOTE for robust predictions.
- **Hyperparameter tuning:** GridSearchCV optimizes Random Forest and SVM models.
- **Backend integration:** FastAPI serves predictions and confidence scores for real-time use.
- **Frontend integration:** React app sends user data and displays results.

## Performance
- **Random Forest (tuned):** CV mean ~96%
- **SVM (tuned):** CV mean ~92%

## Key Steps
1. **Data Cleaning:** Blood Pressure split into Systolic/Diastolic; missing values handled.
2. **Feature Engineering:** Irrelevant features removed; categorical encoding applied.
3. **Balancing:** SMOTE used to equalize class distribution.
4. **Model Training:** Random Forest and SVM trained with hyperparameter tuning.
5. **Validation:** Cross-validation and confusion matrix analysis.
6. **Deployment:** Model and scaler exported for backend use.

## API Usage
Run FastAPI backend:
```
uvicorn main:app --reload
```
POST to `/predict` with JSON:
```
{
	"gender": 0,
	"age": 30,
	"occupation": 0,
	"sleep_duration": 7.5,
	"physical_activity": 60,
	"bmi": 22,
	"heart_rate": 70,
	"daily_steps": 8000,
	"disorder": 0,
	"systolic": 120,
	"diastolic": 80
}
```
Response:
```
{
	"prediction": "Good",
	"confidence": 0.95
}
```

## Frontend Usage
Enter values in the UI and receive prediction and confidence from backend.

## How to Run
1. Train model: `python main.py`
2. Start backend: `uvicorn main:app --reload`
3. Use frontend to send data and view results.

## Project Structure
- `main.py`: ML pipeline and model training
- `backend/main.py`: FastAPI backend
- `models/`: Saved model and scaler
- `data/`: Dataset
- `notebooks/`: Jupyter notebooks

## Contributors
Gunath and team
