
import React from "react";
import { HelpCircle, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";

export const EmmaIngredientsHeader: React.FC = () => {
  const { isAdmin } = useAuth();
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <FlaskConical className="h-4 w-4 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Emma Ingredients
          </h1>
        </div>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Explore our premium ingredients designed for personalized skincare formulations.
          Each ingredient is carefully selected to provide optimal results for various skin concerns.
        </p>
      </div>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <HelpCircle className="h-4 w-4" />
            Help
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              About Emma Ingredients
            </DialogTitle>
            <DialogDescription>
              {isAdmin 
                ? "This page displays all ingredients from the emma_ingredients table in your Supabase database."
                : "This page displays all ingredients available in the Emma collection."}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {isAdmin ? (
              <>
                <h3 className="font-semibold">Troubleshooting Tips:</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>
                    <strong>No data showing?</strong> Make sure your Supabase database has an 'emma_ingredients' table with data.
                  </li>
                  <li>
                    <strong>Connection issues?</strong> Verify your Supabase connection details in the src/integrations/supabase/client.ts file.
                  </li>
                  <li>
                    <strong>Wrong column names?</strong> Ensure column names in the database match the expected format in the EmmaIngredient type.
                  </li>
                </ul>
              </>
            ) : (
              <>
                <h3 className="font-semibold">Need help?</h3>
                <p className="text-muted-foreground">
                  For more information about Emma ingredients or if you have any questions, please contact our support team:
                </p>
                <p className="pt-2">
                  <strong>Email:</strong> <a href="mailto:info@facultyofskin.com" className="text-primary hover:underline">info@facultyofskin.com</a>
                </p>
                <p className="pt-4 text-sm text-muted-foreground">
                  Our team will respond to your inquiry as soon as possible.
                </p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
