import React from 'react';

export function Card({
  children,
  className = '',
  glow = 'none',
  ...props
}) {
  const glowStyles = {
    none: '',
    teal: 'shadow-glow-teal border-accent-teal/30',
    violet: 'shadow-glow-violet border-accent-violet/30'
  };

  return (
    <div
      className={`bg-charcoal-800/80 backdrop-blur-md border border-charcoal-600 rounded-xl p-6 ${glowStyles[glow]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
