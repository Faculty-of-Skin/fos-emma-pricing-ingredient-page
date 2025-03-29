
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { CurrencyToggleGroup } from "@/components/emma/CurrencyToggleGroup";

export const AccountCard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  return (
    <Card className="brutal-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Users className="h-5 w-5" /> Your Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-brutal-gray">Email</p>
            <p className="text-brutal-black">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-brutal-gray">Account Type</p>
            <p className="text-brutal-black capitalize">{profile?.role || "Loading..."}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-brutal-gray">Currency</p>
            <div className="mt-1">
              <CurrencyToggleGroup />
            </div>
          </div>
          <div className="pt-2">
            <Button 
              variant="outline" 
              className="w-full border-2 border-brutal-black" 
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
