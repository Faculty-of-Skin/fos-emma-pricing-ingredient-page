
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { CurrencyToggleGroup } from "@/components/emma/CurrencyToggleGroup";
import { Skeleton } from "@/components/ui/skeleton";

export const AccountCard = () => {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  
  return (
    <Card className="brutal-card border-4 border-brutal-black bg-brutal-white transform transition-transform duration-100 hover:translate-x-1 hover:translate-y-1">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2 font-mono uppercase">
          <Users className="h-5 w-5" /> Your Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-brutal-gray font-mono uppercase">Email</p>
            {isLoading ? (
              <Skeleton className="h-5 w-full" />
            ) : (
              <p className="text-brutal-black">{user?.email}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-brutal-gray font-mono uppercase">Account Type</p>
            {isLoading ? (
              <Skeleton className="h-5 w-32" />
            ) : (
              <p className="text-brutal-black capitalize">{profile?.role || "customer"}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-brutal-gray font-mono uppercase">Currency</p>
            <div className="mt-1">
              <CurrencyToggleGroup />
            </div>
          </div>
          <div className="pt-2">
            <Button 
              variant="outline" 
              className="w-full border-2 border-brutal-black hover:bg-brutal-black hover:text-brutal-white font-mono uppercase tracking-wider" 
              onClick={() => navigate('/account-settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
