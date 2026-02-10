import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  suffix?: string;
}
export function Input({
  label,
  error,
  icon,
  suffix,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <label className="text-sm font-medium text-gray-300 ml-1">{label}</label>
      <div className="relative group">
        {icon &&
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-teal transition-colors">
            {icon}
          </div>
        }
        <input
          className={`w-full bg-charcoal-700 border border-charcoal-600 rounded-lg py-2.5 
            ${icon ? 'pl-10' : 'pl-4'} 
            ${suffix ? 'pr-12' : 'pr-4'} 
            text-white placeholder-gray-500 
            focus:border-accent-teal focus:ring-1 focus:ring-accent-teal focus:outline-none 
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed`}
          {...props} />

        {suffix &&
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium pointer-events-none">
            {suffix}
          </div>
        }
      </div>
      {error && <span className="text-red-400 text-xs ml-1">{error}</span>}
    </div>);

}