
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
    <Card className="brutal-card bg-brutal-black text-brutal-white border-4 border-brutal-black">
      <CardHeader>
        <CardTitle className="text-xl font-semibold uppercase font-mono tracking-wide">Admin Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button 
            className="w-full bg-brutal-white text-brutal-black hover:bg-brutal-gray
            border-2 border-brutal-white uppercase font-mono tracking-wide transform hover:translate-y-0.5 transition-transform"
            onClick={() => navigate('/admin')}
          >
            Admin Panel
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-2 border-brutal-white text-brutal-white hover:bg-brutal-black/60
            uppercase font-mono tracking-wide transform hover:translate-y-0.5 transition-transform"
            onClick={() => navigate('/admin/users')}
          >
            Manage Users
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
