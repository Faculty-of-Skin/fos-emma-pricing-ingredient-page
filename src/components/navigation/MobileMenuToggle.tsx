
import React from "react";
import { Menu } from "lucide-react";

interface MobileMenuToggleProps {
  onClick: () => void;
}

export const MobileMenuToggle = ({ onClick }: MobileMenuToggleProps) => {
  return (
    <button
      onClick={onClick}
      className="text-brutal-black p-2 border-4 border-brutal-black hover:bg-brutal-black hover:text-brutal-white transition-colors font-mono uppercase tracking-wider transform transition-transform hover:translate-x-1 hover:translate-y-1"
    >
      <Menu size={24} />
    </button>
  );
};
