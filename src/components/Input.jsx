import React from 'react';

const Input = ({ 
  variant = 'default',
  className = '',
  error = false,
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    default: 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-accent focus:border-accent',
    search: 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-accent focus:border-accent pl-10'
  };

  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';

  return (
    <input
      className={`${baseClasses} ${variants[variant]} ${errorClasses} ${className}`}
      {...props}
    />
  );
};

export default Input;
