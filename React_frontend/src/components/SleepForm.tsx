import React, { useState } from 'react';
import { Card } from './ui/Card';

import { Input } from './ui/Input';
import { Select } from './ui/Select';

import { Button } from './ui/Button';
import { PredictionCard } from './PredictionCard';
import {
  User,
  Briefcase,
  Scale,
  Moon,
  Heart,
  Activity,
  Footprints,
  Stethoscope,
  AlertCircle } from
'lucide-react';
interface FormData {
  gender: number; // 0=Male, 1=Female
  age: number;
  occupation: number; // occupation code
  bmi: number;
  disorder: number; // 0=None, 1=Yes
  heart_rate: number;
  daily_steps: number;
  systolic: number;
  diastolic: number;
  sleep_duration: number;
  physical_activity: number;
}
const INITIAL_DATA: FormData = {
  gender: 0,
  age: 30,
  occupation: 0,
  bmi: 22,
  disorder: 0,
  heart_rate: 70,
  daily_steps: 8000,
  systolic: 120,
  diastolic: 80,
  sleep_duration: 7.5,
  physical_activity: 60
};
export function SleepForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // For select fields, map display value to backend code
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let newValue: number = Number(value);
    if (name === 'gender') {
      newValue = value === 'Male' ? 0 : 1;
    }
    if (name === 'disorder') {
      newValue = value === 'None' ? 0 : 1;
    }
    if (name === 'occupation') {
      // Example mapping: you can adjust as needed
      const occupationMap: { [key: string]: number } = {
        'Unemployed': 0,
        'Student': 1,
        'Engineer': 2,
        'Doctor': 3,
        'Teacher': 4,
        'Nurse': 5,
        'Salesperson': 6,
        'Accountant': 7,
        'Scientist': 8,
        'Lawyer': 9,
        'Manager': 10
      };
      newValue = occupationMap[value] ?? 0;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: newValue
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Map frontend FormData to backend expected keys
      const backendData = {
        gender: formData.gender,
        age: formData.age,
        occupation: formData.occupation,
        bmi: formData.bmi,
        disorder: formData.disorder,
        heart_rate: formData.heart_rate,
        daily_steps: formData.daily_steps,
        systolic: formData.systolic,
        diastolic: formData.diastolic,
        sleep_duration: formData.sleep_duration,
        physical_activity: formData.physical_activity
      };
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(backendData)
      });
      if (!response.ok) {
        throw new Error('Failed to connect to the prediction service');
      }
      const result = await response.json();
      // Assuming the API returns { "prediction": "Good" } or similar
      setPrediction(result.prediction || 'Good Sleep Quality');
    } catch (err) {
      console.error(err);
      setError(
        'Could not connect to the local prediction engine. Please ensure the backend is running at port 8000.'
      );
      // Do not use mock/demo fallback in production
    } finally {
      setLoading(false);
    }
  };
  // Removed unused calculateMockPrediction function
  const handleReset = () => {
    setPrediction(null);
    setFormData(INITIAL_DATA);
    setError(null);
  };
  if (prediction) {
    return (
      <PredictionCard
        prediction={prediction}
        formData={formData}
        onReset={handleReset} />);


  }
  return (
    <Card className="w-full max-w-4xl mx-auto" glow="teal">
      <form onSubmit={handleSubmit} className="space-y-8">
        {error &&
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        }

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Row 1 */}
          <Select
            label="Gender"
            name="gender"
            value={formData.gender === 0 ? 'Male' : 'Female'}
            onChange={handleChange}
            icon={<User className="w-4 h-4" />}
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' }
            ]}
          />
          <Input
            label="Age"
            name="age"
            type="number"
            min={18}
            max={100}
            value={formData.age}
            onChange={handleChange}
            icon={<User className="w-4 h-4" />}
            suffix="yrs" />
          <Select
            label="Occupation"
            name="occupation"
            value={(() => {
              const occMap = [
                'Unemployed', 'Student', 'Engineer', 'Doctor', 'Teacher',
                'Nurse', 'Salesperson', 'Accountant', 'Scientist', 'Lawyer', 'Manager'
              ];
              return occMap[formData.occupation] || 'Unemployed';
            })()}
            onChange={handleChange}
            icon={<Briefcase className="w-4 h-4" />}
            options={[
              { value: 'Unemployed', label: 'Unemployed' },
              { value: 'Student', label: 'Student' },
              { value: 'Engineer', label: 'Engineer' },
              { value: 'Doctor', label: 'Doctor' },
              { value: 'Teacher', label: 'Teacher' },
              { value: 'Nurse', label: 'Nurse' },
              { value: 'Salesperson', label: 'Salesperson' },
              { value: 'Accountant', label: 'Accountant' },
              { value: 'Scientist', label: 'Scientist' },
              { value: 'Lawyer', label: 'Lawyer' },
              { value: 'Manager', label: 'Manager' }
            ]}
          />
          {/* Row 2 */}
          <Input
            label="BMI (numeric)"
            name="bmi"
            type="number"
            min={10}
            max={50}
            value={formData.bmi}
            onChange={handleChange}
            icon={<Scale className="w-4 h-4" />}
          />
          <Select
            label="Disorder"
            name="disorder"
            value={formData.disorder === 0 ? 'None' : 'Yes'}
            onChange={handleChange}
            icon={<Moon className="w-4 h-4" />}
            options={[
              { value: 'None', label: 'None' },
              { value: 'Yes', label: 'Yes' }
            ]}
          />
          <Input
            label="Heart Rate"
            name="heart_rate"
            type="number"
            min={40}
            max={120}
            value={formData.heart_rate}
            onChange={handleChange}
            icon={<Heart className="w-4 h-4" />}
            suffix="bpm" />
          {/* Row 3 */}
          <Input
            label="Daily Steps"
            name="daily_steps"
            type="number"
            min={0}
            max={30000}
            value={formData.daily_steps}
            onChange={handleChange}
            icon={<Footprints className="w-4 h-4" />}
            suffix="steps" />
          <Input
            label="Systolic BP"
            name="systolic"
            type="number"
            min={80}
            max={200}
            value={formData.systolic}
            onChange={handleChange}
            icon={<Stethoscope className="w-4 h-4" />}
            suffix="mmHg" />
          <Input
            label="Diastolic BP"
            name="diastolic"
            type="number"
            min={40}
            max={130}
            value={formData.diastolic}
            onChange={handleChange}
            icon={<Activity className="w-4 h-4" />}
            suffix="mmHg" />
        </div>

        {/* Row 4 - Sliders */}
        <div className="space-y-8 pt-4 border-t border-charcoal-600/50">
          <Input
            label="Sleep Duration (hours)"
            name="sleep_duration"
            type="number"
            min={0}
            max={12}
            step={0.1}
            value={formData.sleep_duration}
            onChange={handleChange}
          />
          <Input
            label="Physical Activity (min/day)"
            name="physical_activity"
            type="number"
            min={0}
            max={100}
            value={formData.physical_activity}
            onChange={handleChange}
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            fullWidth
            isLoading={loading}
            className="h-14 text-lg font-semibold tracking-wide">

            Predict Sleep Quality
          </Button>
        </div>
      </form>
    </Card>);

}