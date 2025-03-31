import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Calendar,
  LineChart,
  Settings,
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
      <Card className="hover:bg-accent/40 transition-colors">
        <CardContent className="flex items-center space-x-4 p-3">
          <div className={`p-2 rounded-md ${color}`}>{icon}</div>
          <div>
            <h2 className="text-sm font-semibold">{title}</h2>
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
      icon: <LineChart className="h-5 w-5" />,
      title: "Dashboard",
      description: "View overall insights",
      path: "/dashboard",
      color: "bg-blue-100",
    },
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
      icon: <Settings className="h-5 w-5" />,
      title: "Settings",
      description: "Configure app settings",
      path: "/settings",
      color: "bg-red-100",
    },
    // Add Emma Ingredients to dashboard quick access
    {
      icon: <Database className="h-5 w-5" />,
      title: "Emma Ingredients",
      description: "Browse the Emma ingredients database",
      path: "/emma-ingredients",
      color: "bg-purple-100"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {quickAccessItems.map((item) => (
        <QuickAccessItem key={item.title} {...item} />
      ))}
    </div>
  );
};
