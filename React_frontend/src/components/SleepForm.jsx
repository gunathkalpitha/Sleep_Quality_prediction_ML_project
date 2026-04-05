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
  Brain,
  Stethoscope,
  AlertCircle
} from 'lucide-react';

const INITIAL_DATA = {
  gender: 'Male',
  age: 30,
  occupation: 'Engineer',
  sleep_duration: 7.5,
  physical_activity: 60,
  bmi_category: 'Normal',
  heart_rate: 70,
  daily_steps: 8000,
  sleep_disorder: 'None',
  systolic_bp: 120,
  diastolic_bp: 80
};

export function SleepForm() {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = [
      'age',
      'sleep_duration',
      'physical_activity',
      'heart_rate',
      'daily_steps',
      'systolic_bp',
      'diastolic_bp'
    ];
    const newValue = numericFields.includes(name) ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.error || 'Prediction request failed');
      }
      const result = await response.json();
      setPrediction({
        final_prediction: result.final_prediction || 'Good',
        agreement: result.agreement,
        svm: result.svm,
        random_forest: result.random_forest
      });
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : 'Could not connect to the prediction engine on port 8000.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPrediction(null);
    setFormData(INITIAL_DATA);
    setError(null);
  };

  if (prediction) {
    return (
      <PredictionCard
        prediction={prediction.final_prediction}
        formData={formData}
        modelDetails={prediction}
        onReset={handleReset}
      />
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto" glow="teal">
      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Row 1 */}
          <Select
            label="Gender"
            name="gender"
            value={formData.gender}
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
            suffix="yrs"
          />
          <Select
            label="Occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            icon={<Briefcase className="w-4 h-4" />}
            options={[
              { value: 'Unemployed', label: 'Unemployed' },
              { value: 'Software Engineer', label: 'Software Engineer' },
              { value: 'Engineer', label: 'Engineer' },
              { value: 'Doctor', label: 'Doctor' },
              { value: 'Teacher', label: 'Teacher' },
              { value: 'Nurse', label: 'Nurse' },
              { value: 'Sales Representative', label: 'Sales Representative' },
              { value: 'Salesperson', label: 'Salesperson' },
              { value: 'Accountant', label: 'Accountant' },
              { value: 'Scientist', label: 'Scientist' },
              { value: 'Lawyer', label: 'Lawyer' },
              { value: 'Manager', label: 'Manager' }
            ]}
          />
          {/* Row 2 */}
          <Select
            label="BMI Category"
            name="bmi_category"
            value={formData.bmi_category}
            onChange={handleChange}
            icon={<Scale className="w-4 h-4" />}
            options={[
              { value: 'Normal', label: 'Normal' },
              { value: 'Normal Weight', label: 'Normal Weight' },
              { value: 'Overweight', label: 'Overweight' },
              { value: 'Obese', label: 'Obese' }
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
            suffix="bpm"
          />
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
            suffix="steps"
          />
          <Input
            label="Systolic BP"
            name="systolic_bp"
            type="number"
            min={80}
            max={200}
            value={formData.systolic_bp}
            onChange={handleChange}
            icon={<Stethoscope className="w-4 h-4" />}
            suffix="mmHg"
          />
          <Input
            label="Diastolic BP"
            name="diastolic_bp"
            type="number"
            min={40}
            max={130}
            value={formData.diastolic_bp}
            onChange={handleChange}
            icon={<Activity className="w-4 h-4" />}
            suffix="mmHg"
          />
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
          <Select
            label="Sleep Disorder"
            name="sleep_disorder"
            value={formData.sleep_disorder}
            onChange={handleChange}
            icon={<Moon className="w-4 h-4" />}
            options={[
              { value: 'None', label: 'None' },
              { value: 'Insomnia', label: 'Insomnia' },
              { value: 'Sleep Apnea', label: 'Sleep Apnea' }
            ]}
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            fullWidth
            isLoading={loading}
            className="h-14 text-lg font-semibold tracking-wide"
          >
            Predict Sleep Quality
          </Button>
        </div>
      </form>
    </Card>
  );
}
