import React from 'react';

const Card = ({ children, variant = 'default', className = '', ...props }) => {
  const baseClasses = 'rounded-lg border transition-colors';
  
  const variants = {
    default: 'bg-white/10 border-white/20 backdrop-blur-sm',
    elevated: 'bg-white border border-gray-200 shadow-card'
  };

  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;