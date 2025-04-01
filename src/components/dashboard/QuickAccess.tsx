
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Calendar,
  LineChart,
  Database,
} from "lucide-react";
import { Link } from "react-router-dom";

interface QuickAccessItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
  color: string;
}

const QuickAccessItem: React.FC<QuickAccessItemProps> = ({
  icon,
  title,
  description,
  path,
  color,
}) => {
  return (
    <Link to={path}>
      <Card className="hover:bg-accent/40 transition-colors border-2 border-brutal-black/10 hover:border-brutal-black/30">
        <CardContent className="flex items-center space-x-4 p-3">
          <div className={`p-2 rounded-md ${color}`}>{icon}</div>
          <div>
            <h2 className="text-sm font-semibold uppercase font-mono">{title}</h2>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export const QuickAccess: React.FC = () => {
  const quickAccessItems = [
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Products",
      description: "Manage your products",
      path: "/products",
      color: "bg-green-100",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Forecasts",
      description: "View sales forecasts",
      path: "/forecasts",
      color: "bg-orange-100",
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "Emma Ingredients",
      description: "Browse the Emma ingredients database",
      path: "/emma-ingredients",
      color: "bg-purple-100"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      {quickAccessItems.map((item) => (
        <QuickAccessItem key={item.title} {...item} />
      ))}
    </div>
  );
};
