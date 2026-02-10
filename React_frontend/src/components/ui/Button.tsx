import React from 'react';
import { Loader2 } from 'lucide-react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  fullWidth?: boolean;
}
export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-charcoal-900 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary:
    'bg-gradient-to-r from-accent-teal to-teal-500 hover:from-teal-400 hover:to-teal-300 text-charcoal-900 shadow-lg shadow-teal-900/20 focus:ring-accent-teal',
    secondary:
    'bg-charcoal-700 hover:bg-charcoal-600 text-white border border-charcoal-600 focus:ring-charcoal-500',
    outline:
    'bg-transparent border border-accent-teal text-accent-teal hover:bg-accent-teal/10 focus:ring-accent-teal'
  };
  const sizes = 'px-6 py-3 text-sm sm:text-base';
  const width = fullWidth ? 'w-full' : '';
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes} ${width} ${className}`}
      disabled={disabled || isLoading}
      {...props}>

      {isLoading ?
      <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Processing...
        </> :

      children
      }
    </button>);

}