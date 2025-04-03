
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export const NavItem = ({ icon, href, label }: NavItemProps) => {
  const navigate = useNavigate();
  const isActive = window.location.pathname === href;

  return (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-2 font-mono text-sm transition-transform uppercase
        ${isActive 
          ? "bg-brutal-black text-brutal-white font-bold transform translate-x-1 translate-y-1" 
          : "text-brutal-black hover:bg-brutal-black/10"
        } 
        border-2 ${isActive ? "border-brutal-black" : "border-transparent hover:border-brutal-black/50"}`}
      onClick={() => navigate(href)}
    >
      {icon}
      {label}
    </Button>
  );
};
