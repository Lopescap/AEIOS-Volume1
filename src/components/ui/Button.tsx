import React from 'react';
import { ButtonVariant } from '../../types';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = ButtonVariant.PRIMARY, 
  isLoading, 
  leftIcon,
  rightIcon,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    [ButtonVariant.PRIMARY]: "bg-gradient-signal text-white hover:opacity-90 hover:scale-[1.02] shadow-lg shadow-aeios-signal/20 focus:ring-aeios-signal",
    [ButtonVariant.SECONDARY]: "bg-transparent border-2 border-slate-200 text-slate-700 hover:border-aeios-interactive hover:text-aeios-interactive focus:ring-aeios-interactive",
    [ButtonVariant.GHOST]: "bg-transparent text-aeios-signal hover:bg-aeios-signal/10 focus:ring-aeios-signal",
    [ButtonVariant.DARK]: "bg-slate-900 text-white hover:bg-slate-800 shadow-md focus:ring-slate-700"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;