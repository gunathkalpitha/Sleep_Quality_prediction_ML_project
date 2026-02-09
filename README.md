# Sleep_Quality_prediction_ML_project

# Sleep Quality Prediction using ML

This project predicts sleep quality categories (Poor, Fair, Good, Excellent) using lifestyle and physiological data from wearable devices.

##  Performance
- **Random Forest Accuracy:** 96.30%
- **SVM Accuracy:** 96.30%

##  Key Steps Taken
1. **Data Cleaning:** Handled Blood Pressure strings by splitting them into Systolic and Diastolic values.
2. **Feature Engineering:** Removed 'Person ID' and 'Stress Level' to prevent data leakage and overfitting.
3. **Preprocessing:** Used `StandardScaler` for SVM and `LabelEncoder` for categorical variables like Occupation and Gender.
4. **Validation:** Applied 80/20 train-test splitting and verified results.

##  Key Insights
Heart Rate and Sleep Duration were identified as the most influential factors in determining sleep quality.

##  How to Use
Load the `sleep_quality_model.pkl` using `joblib` to make predictions on new sensor data.
