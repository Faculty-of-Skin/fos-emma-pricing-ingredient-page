
import React from 'react';

interface NavButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'outline';
}

export const NavButton = ({ children, onClick, variant = 'default' }: NavButtonProps) => {
  const baseClasses = "px-4 py-2 font-medium rounded transition-colors duration-200";
  
  const variantClasses = variant === 'outline'
    ? "border-2 border-brutal-black text-brutal-black hover:bg-brutal-black/10"
    : "bg-brutal-black text-white hover:bg-brutal-black/80";
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      {children}
    </button>
  );
};
