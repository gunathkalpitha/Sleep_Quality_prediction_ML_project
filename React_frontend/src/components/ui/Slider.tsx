import React from 'react';
interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}
export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  className = '',
  ...props
}: SliderProps) {
  // Calculate percentage for background gradient
  const percentage = (value - min) / (max - min) * 100;
  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      <div className="flex justify-between items-end">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <span className="text-accent-teal font-bold text-lg">
          {value}{' '}
          <span className="text-sm text-gray-500 font-normal">{unit}</span>
        </span>
      </div>

      <div className="relative w-full h-6 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          className="absolute w-full h-2 bg-charcoal-600 rounded-full appearance-none cursor-pointer z-10"
          style={{
            background: `linear-gradient(to right, #2dd4bf ${percentage}%, #3f3f56 ${percentage}%)`
          }}
          {...props} />

        <style>{`
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #f8fafc;
            border: 2px solid #2dd4bf;
            box-shadow: 0 0 10px rgba(45, 212, 191, 0.5);
            cursor: pointer;
            margin-top: 0px; /* Adjust if needed */
            transition: transform 0.1s;
          }
          input[type=range]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
          }
          input[type=range]::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #f8fafc;
            border: 2px solid #2dd4bf;
            box-shadow: 0 0 10px rgba(45, 212, 191, 0.5);
            cursor: pointer;
            transition: transform 0.1s;
          }
        `}</style>
      </div>

      <div className="flex justify-between text-xs text-gray-500 px-1">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>
    </div>);

}