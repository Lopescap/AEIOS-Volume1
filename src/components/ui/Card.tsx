import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'dark' | 'pillar';
  pillarColor?: string; // Hex code or tailwind color class
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  pillarColor,
  hoverEffect = true
}) => {
  const baseStyles = "rounded-xl p-6 transition-all duration-200";
  
  const variants = {
    default: "bg-white border border-slate-200",
    elevated: "bg-white shadow-md border-transparent",
    dark: "bg-aeios-surface border border-slate-700 text-white",
    pillar: "bg-white border-t-4 shadow-sm"
  };

  const hoverStyles = hoverEffect ? "hover:-translate-y-1 hover:shadow-lg" : "";
  
  const style = variant === 'pillar' && pillarColor ? { borderTopColor: pillarColor } : {};

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;