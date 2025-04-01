
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const AdminTools = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  
  if (profile?.role !== "admin") {
    return null;
  }
  
  return (
    <Card className="brutal-card bg-brutal-black text-brutal-white border-4 border-brutal-black transform transition-transform duration-100 hover:translate-x-1 hover:translate-y-1">
      <CardHeader>
        <CardTitle className="text-xl font-semibold font-mono uppercase">Admin Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button 
            className="w-full bg-brutal-white text-brutal-black hover:bg-brutal-gray font-mono uppercase tracking-wider"
            onClick={() => navigate('/admin')}
          >
            Admin Panel
          </Button>
          <Button 
            variant="outline" 
            className="w-full border border-brutal-white text-brutal-white hover:bg-brutal-black/60 font-mono uppercase tracking-wider"
            onClick={() => navigate('/admin/users')}
          >
            Manage Users
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
