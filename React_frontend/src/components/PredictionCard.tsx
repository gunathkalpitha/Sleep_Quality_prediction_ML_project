
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { RefreshCw, Activity, Heart, Brain, Moon } from 'lucide-react';
interface FormData {
  gender: number;
  age: number;
  occupation: number;
  bmi: number;
  disorder: number;
  heart_rate: number;
  daily_steps: number;
  systolic: number;
  diastolic: number;
  sleep_duration: number;
  physical_activity: number;
}
interface PredictionCardProps {
  prediction: string;
  formData: FormData;
  onReset: () => void;
}
export function PredictionCard({
  prediction,
  formData,
  onReset
}: PredictionCardProps) {
  // Determine styles based on prediction
  const getStatusColor = (pred: string) => {
    const p = pred.toLowerCase();
    if (p.includes('poor') || p.includes('insomnia')) return 'red';
    if (p.includes('fair') || p.includes('average')) return 'yellow';
    return 'green'; // Good, Excellent, Normal
  };
  const status = getStatusColor(prediction);
  const statusStyles = {
    red: {
      border: 'border-red-500/50',
      text: 'text-red-400',
      bg: 'bg-red-500/10',
      glow: 'shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]',
      icon: <Activity className="w-12 h-12 text-red-400" />
    },
    yellow: {
      border: 'border-yellow-500/50',
      text: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      glow: 'shadow-[0_0_30px_-5px_rgba(234,179,8,0.3)]',
      icon: <Brain className="w-12 h-12 text-yellow-400" />
    },
    green: {
      border: 'border-emerald-500/50',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      glow: 'shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]',
      icon: <Moon className="w-12 h-12 text-emerald-400" />
    }
  };
  const currentStyle = statusStyles[status];
  // Generate a personalized tip
  const getTip = () => {
    if (formData.sleep_duration < 6)
    return 'Try to increase your sleep duration by establishing a consistent bedtime routine.';
    if (formData.daily_steps < 5000)
    return 'Increasing your daily steps could help improve your sleep quality.';
    // if (formData.stressLevel > 7)
    // return 'Consider mindfulness or meditation to lower stress before bed.'; // Removed: stressLevel not in FormData
    if (formData.bmi > 25)
    return 'Managing weight through diet and exercise can significantly improve sleep apnea symptoms.';
    if (status === 'green')
    return "You're doing great! Keep maintaining your healthy habits.";
    return 'Focus on maintaining a regular sleep schedule and moderate physical activity.';
  };
  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
      <Card
        className={`text-center p-8 border-2 ${currentStyle.border} ${currentStyle.glow}`}>

        <div className="flex justify-center mb-6">
          <div
            className={`p-4 rounded-full ${currentStyle.bg} ring-1 ring-inset ${currentStyle.border.replace('border', 'ring')}`}>

            {currentStyle.icon}
          </div>
        </div>

        <h2 className="text-gray-400 font-medium uppercase tracking-wider text-sm mb-2">
          Predicted Sleep Quality
        </h2>
        <div
          className={`text-4xl md:text-5xl font-bold ${currentStyle.text} mb-6`}>

          {prediction}
        </div>

        <div className="bg-charcoal-900/50 rounded-lg p-6 mb-8 text-left border border-charcoal-600">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Heart className="w-4 h-4 text-accent-teal" />
            Health Tip
          </h3>
          <p className="text-gray-300 leading-relaxed">{getTip()}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
          <div className="bg-charcoal-700/30 p-3 rounded-lg">
            <div className="text-gray-500 text-xs">Duration</div>
            <div className="text-white font-medium">
              {formData.sleep_duration} hrs
            </div>
          </div>
          <div className="bg-charcoal-700/30 p-3 rounded-lg">
            <div className="text-gray-500 text-xs">Activity</div>
            <div className="text-white font-medium">
              {formData.physical_activity} min
            </div>
          </div>
          <div className="bg-charcoal-700/30 p-3 rounded-lg">
            <div className="text-gray-500 text-xs">Steps</div>
            <div className="text-white font-medium">{formData.daily_steps}</div>
          </div>
          <div className="bg-charcoal-700/30 p-3 rounded-lg">
            <div className="text-gray-500 text-xs">Heart Rate</div>
            <div className="text-white font-medium">
              {formData.heart_rate} bpm
            </div>
          </div>
        </div>

        <Button onClick={onReset} variant="secondary" className="min-w-[200px]">
          <RefreshCw className="w-4 h-4 mr-2" />
          Analyze Another
        </Button>
      </Card>
    </div>);

}