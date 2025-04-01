
import React from "react";
import { Menu } from "lucide-react";

interface MobileMenuToggleProps {
  onClick: () => void;
}

export const MobileMenuToggle = ({ onClick }: MobileMenuToggleProps) => {
  return (
    <button
      onClick={onClick}
      className="text-brutal-black p-2 border-2 border-brutal-black hover:bg-brutal-black hover:text-brutal-white transition-colors"
    >
      <Menu size={24} />
    </button>
  );
};
