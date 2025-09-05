import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const Alert = ({ children, variant = 'info', className = '' }) => {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    error: AlertCircle
  };

  const variants = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  };

  const Icon = icons[variant];

  return (
    <div className={`flex items-center space-x-2 p-4 border rounded-lg ${variants[variant]} ${className}`}>
      <Icon className="h-5 w-5 flex-shrink-0" />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Alert;