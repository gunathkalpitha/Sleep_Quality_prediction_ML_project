import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
import joblib
import numpy as np
from sklearn.model_selection import train_test_split

# Load dataset
csv_path = 'data/Sleep_health_and_lifestyle_dataset.csv'
df = pd.read_csv(csv_path)
print("Class distribution (Quality of Sleep):")
print(df['Quality of Sleep'].value_counts())

# Parse 'Blood Pressure' into 'Systolic' and 'Diastolic'
def parse_bp(bp):
    try:
        systolic, diastolic = bp.split('/')
        return int(systolic), int(diastolic)
    except:
        return 0, 0

df['Systolic'], df['Diastolic'] = zip(*df['Blood Pressure'].map(parse_bp))
df = df[(df['Systolic'] > 0) & (df['Diastolic'] > 0)]

# Encode categorical features
for col in ['Gender', 'Occupation', 'BMI Category', 'Sleep Disorder']:
    df[col] = df[col].astype('category').cat.codes

feature_cols = [
    'Gender', 'Age', 'Occupation', 'Sleep Duration', 'Physical Activity Level',
    'BMI Category', 'Heart Rate', 'Daily Steps', 'Sleep Disorder', 'Systolic', 'Diastolic'
]
label_col = 'Quality of Sleep'

X = df[feature_cols]
y = df[label_col]

# Split into train/test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
model = RandomForestClassifier(random_state=42)
model.fit(X_train_scaled, y_train)

# Calculate training accuracy
y_train_pred = model.predict(X_train_scaled)
train_acc = accuracy_score(y_train, y_train_pred)
print(f"Training accuracy: {train_acc:.4f}")

# Calculate test accuracy
y_test_pred = model.predict(X_test_scaled)
test_acc = accuracy_score(y_test, y_test_pred)
print(f"Test accuracy: {test_acc:.4f}")

# Show predicted class distribution on test set
print("Predicted class distribution (test set):")
print(pd.Series(y_test_pred).value_counts())

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train model
model = RandomForestClassifier(random_state=42)
model.fit(X_scaled, y)

# Calculate training accuracy
y_pred = model.predict(X_scaled)
acc = accuracy_score(y, y_pred)
print(f"Training accuracy: {acc:.4f}")

# Save scaler and model
joblib.dump(scaler, 'models/scaler.pkl')
joblib.dump(model, 'models/sleep_quality_model.pkl')
print('Model and scaler trained and saved.')