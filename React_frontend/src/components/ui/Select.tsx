import React from 'react';
import { ChevronDown } from 'lucide-react';
interface Option {
  value: string;
  label: string;
}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
  icon?: React.ReactNode;
}
export function Select({
  label,
  options,
  error,
  icon,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <label className="text-sm font-medium text-gray-300 ml-1">{label}</label>
      <div className="relative group">
        {icon &&
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-teal transition-colors pointer-events-none">
            {icon}
          </div>
        }
        <select
          className={`w-full bg-charcoal-700 border border-charcoal-600 rounded-lg py-2.5 
            ${icon ? 'pl-10' : 'pl-4'} 
            pr-10
            text-white appearance-none cursor-pointer
            focus:border-accent-teal focus:ring-1 focus:ring-accent-teal focus:outline-none 
            transition-all duration-200
            disabled:opacity-50`}
          {...props}>

          {options.map((opt) =>
          <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && <span className="text-red-400 text-xs ml-1">{error}</span>}
    </div>);

}