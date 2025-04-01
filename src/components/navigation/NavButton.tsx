
import React from 'react';

interface NavButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'outline';
}

export const NavButton = ({ children, onClick, variant = 'default' }: NavButtonProps) => {
  const baseClasses = "px-4 py-2 font-medium rounded-none transition-all duration-200 font-mono uppercase tracking-wider text-sm";
  
  const variantClasses = variant === 'outline'
    ? "border-2 border-brutal-black text-brutal-black hover:bg-brutal-black/10 hover:translate-x-1 hover:translate-y-1"
    : "bg-brutal-black text-brutal-white border-2 border-brutal-black hover:bg-brutal-dark hover:translate-x-1 hover:translate-y-1";
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      {children}
    </button>
  );
};
