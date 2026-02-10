import React from 'react';
import { Moon, Sparkles } from 'lucide-react';
export function Header() {
  return (
    <header className="text-center mb-10 space-y-4">
      <div className="inline-flex items-center justify-center p-3 bg-charcoal-800 rounded-full border border-charcoal-600 shadow-glow-teal mb-4">
        <Moon className="w-8 h-8 text-accent-teal fill-accent-teal/20" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        Sleep Quality{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-teal to-accent-violet">
          Predictor
        </span>
      </h1>

      <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
        Analyze your daily habits and health metrics to predict your sleep
        quality. Our advanced model helps you understand what factors impact
        your rest.
      </p>

      <div className="flex items-center justify-center gap-2 text-sm text-accent-violet/80 font-medium">
        <Sparkles className="w-4 h-4" />
        <span>AI-Powered Analysis</span>
      </div>
    </header>);

}