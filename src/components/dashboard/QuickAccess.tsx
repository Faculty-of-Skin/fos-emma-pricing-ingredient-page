
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Calendar,
  LineChart,
  Settings,
  Database,
  LayoutDashboard,
  ArrowRight
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
    <Link to={path} className="group">
      <Card className="border-4 border-brutal-black bg-brutal-white h-full transform transition-transform duration-100 hover:translate-x-1 hover:translate-y-1">
        <CardContent className="p-4">
          <div className={`w-12 h-12 rounded-none mb-3 flex items-center justify-center border-2 border-brutal-black ${color}`}>
            {icon}
          </div>
          <h2 className="text-base font-semibold mb-1 font-mono uppercase group-hover:text-brutal-dark transition-colors">{title}</h2>
          <p className="text-sm text-brutal-gray mb-2">{description}</p>
          <div className="flex items-center text-xs text-brutal-charcoal font-mono font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Go to {title.toLowerCase()} <ArrowRight className="ml-1 h-3 w-3" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export const QuickAccess: React.FC = () => {
  const quickAccessItems = [
    {
      icon: <LayoutDashboard className="h-6 w-6 text-brutal-black" />,
      title: "Dashboard",
      description: "View overall insights",
      path: "/dashboard",
      color: "bg-brutal-white",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-brutal-black" />,
      title: "Products",
      description: "Manage your products",
      path: "/products",
      color: "bg-brutal-white",
    },
    {
      icon: <Calendar className="h-6 w-6 text-brutal-black" />,
      title: "Forecasts",
      description: "View sales forecasts",
      path: "/forecasts",
      color: "bg-brutal-white",
    },
    {
      icon: <Database className="h-6 w-6 text-brutal-black" />,
      title: "Emma Ingredients",
      description: "Browse the ingredients database",
      path: "/emma-ingredients",
      color: "bg-brutal-white",
    },
    {
      icon: <Settings className="h-6 w-6 text-brutal-black" />,
      title: "Settings",
      description: "Configure app settings",
      path: "/account-settings",
      color: "bg-brutal-white",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {quickAccessItems.map((item) => (
        <QuickAccessItem key={item.title} {...item} />
      ))}
    </div>
  );
};
