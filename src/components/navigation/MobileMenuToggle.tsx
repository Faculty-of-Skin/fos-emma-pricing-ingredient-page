
import React from "react";
import { Menu } from "lucide-react";

interface MobileMenuToggleProps {
  onClick: () => void;
}

export const MobileMenuToggle = ({ onClick }: MobileMenuToggleProps) => {
  return (
    <button
      onClick={onClick}
      className="text-brutal-black p-2"
    >
      <Menu size={24} />
    </button>
  );
};
