
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
    <Card className="brutal-card mt-8">
      <CardHeader>
        <CardTitle className="text-xl">Emma Ingredients</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">Loading ingredients...</p>
      </CardContent>
    </Card>
  );
};
