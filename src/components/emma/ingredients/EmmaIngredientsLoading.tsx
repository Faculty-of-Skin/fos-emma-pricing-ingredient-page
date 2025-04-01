
import React from "react";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export const EmmaIngredientsLoading: React.FC = () => {
  return (
    <Card className="border-4 border-brutal-black mt-8 bg-brutal-white">
      <CardHeader className="border-b-4 border-brutal-black">
        <CardTitle className="text-xl font-mono uppercase tracking-wider text-brutal-black">Emma Ingredients</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-brutal-black" />
        <p className="mt-4 text-brutal-black font-mono uppercase">LOADING INGREDIENTS...</p>
      </CardContent>
    </Card>
  );
};
