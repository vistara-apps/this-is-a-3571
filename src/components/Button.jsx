import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-600 focus:ring-primary',
    secondary: 'bg-white/20 text-white hover:bg-white/30 focus:ring-white',
    outline: 'border border-white/30 text-white hover:bg-white/10 focus:ring-white'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;