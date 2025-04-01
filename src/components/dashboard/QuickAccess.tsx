
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
  gradient: string;
}

const QuickAccessItem: React.FC<QuickAccessItemProps> = ({
  icon,
  title,
  description,
  path,
  gradient,
}) => {
  return (
    <Link to={path} className="group">
      <Card className="hover:shadow-md transition-all duration-300 h-full border-2 border-gray-100">
        <CardContent className="p-4">
          <div className={`w-12 h-12 rounded-lg mb-3 flex items-center justify-center ${gradient}`}>
            {icon}
          </div>
          <h2 className="text-base font-semibold mb-1 group-hover:text-blue-600 transition-colors">{title}</h2>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          <div className="flex items-center text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
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
      icon: <LayoutDashboard className="h-6 w-6 text-white" />,
      title: "Dashboard",
      description: "View overall insights",
      path: "/dashboard",
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-white" />,
      title: "Products",
      description: "Manage your products",
      path: "/products",
      gradient: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      icon: <Calendar className="h-6 w-6 text-white" />,
      title: "Forecasts",
      description: "View sales forecasts",
      path: "/forecasts",
      gradient: "bg-gradient-to-br from-amber-500 to-amber-600",
    },
    {
      icon: <Database className="h-6 w-6 text-white" />,
      title: "Emma Ingredients",
      description: "Browse the ingredients database",
      path: "/emma-ingredients",
      gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      icon: <Settings className="h-6 w-6 text-white" />,
      title: "Settings",
      description: "Configure app settings",
      path: "/account-settings",
      gradient: "bg-gradient-to-br from-slate-500 to-slate-600",
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
