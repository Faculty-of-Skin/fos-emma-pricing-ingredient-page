
import React from "react";

interface NavButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const NavButton = ({ onClick, children }: NavButtonProps) => {
  return (
    <button 
      className="brutal-button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
