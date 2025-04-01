
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { EmmaIngredientsSplit } from "@/components/emma/ingredients/EmmaIngredientsSplit";
import { Button } from "@/components/ui/button";
import { HelpCircle, List, FileText, Leaf, Sparkles, Droplets, Beaker, FlaskConical } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { useEmmaIngredients } from "@/hooks/useEmmaIngredients";
import { EmmaProductSimulator } from "@/components/emma/ingredients/product-simulator/EmmaProductSimulator";
import { Separator } from "@/components/ui/separator";

const EmmaIngredientsPage = () => {
  const { isAdmin } = useAuth();
  const { ingredients, isLoading, error } = useEmmaIngredients();
  
  // Filter out equipment and accessories
  const filteredIngredientsWithoutEquipment = !isLoading && !error ? ingredients.filter(
    (ingredient) => {
      const category = ingredient.Category?.toLowerCase() || "";
      return !category.includes("equipment") && !category.includes("accessories") && !category.includes("accessory");
    }
  ) : [];

  return (
    <DashboardLayout>
      <div className="bg-brutal-white min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl py-12">
          <div className="flex flex-col gap-6 mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-brutal-black tracking-tight font-mono uppercase">
                  Emma Ingredients
                </h1>
                <p className="text-lg text-brutal-charcoal mt-2 max-w-3xl font-mono">
                  Explore our premium ingredients designed for personalized skincare formulations.
                </p>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 h-10 px-4 border-4 border-brutal-black bg-brutal-white text-brutal-black hover:bg-brutal-black hover:text-brutal-white font-mono uppercase tracking-wider transform transition-transform hover:translate-x-1 hover:translate-y-1">
                    <HelpCircle className="h-4 w-4" />
                    HELP
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-md border-4 border-brutal-black bg-brutal-white">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-mono uppercase text-brutal-black">About Emma Ingredients</DialogTitle>
                    <DialogDescription className="text-brutal-charcoal font-mono">
                      {isAdmin 
                        ? "This page displays all ingredients from the emma_ingredients table in your Supabase database."
                        : "This page displays all ingredients available in the Emma collection."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 space-y-4">
                    {isAdmin ? (
                      <>
                        <h3 className="font-semibold text-brutal-black font-mono uppercase">Troubleshooting Tips:</h3>
                        <ul className="list-disc pl-5 space-y-2 text-brutal-charcoal font-mono">
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
                        <h3 className="font-semibold text-brutal-black font-mono uppercase">Need help?</h3>
                        <p className="text-brutal-charcoal font-mono">
                          For more information about Emma ingredients or if you have any questions, please contact our support team:
                        </p>
                        <p className="pt-2 font-mono">
                          <strong>Email:</strong> <a href="mailto:info@facultyofskin.com" className="text-brutal-dark hover:underline">info@facultyofskin.com</a>
                        </p>
                        <p className="pt-4 text-sm text-brutal-charcoal font-mono">
                          Our team will respond to your inquiry as soon as possible.
                        </p>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-brutal-white p-6 border-4 border-brutal-black flex flex-col items-center text-center transform transition-all hover:translate-x-1 hover:translate-y-1">
              <div className="h-14 w-14 border-4 border-brutal-black bg-brutal-white flex items-center justify-center mb-4">
                <Leaf className="h-7 w-7 text-brutal-charcoal" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brutal-black font-mono uppercase">Texture Capsules</h3>
              <p className="text-brutal-charcoal text-sm font-mono">
                The base formulation that determines the feel and consistency of the final product.
              </p>
            </div>
            
            <div className="bg-brutal-white p-6 border-4 border-brutal-black flex flex-col items-center text-center transform transition-all hover:translate-x-1 hover:translate-y-1">
              <div className="h-14 w-14 border-4 border-brutal-black bg-brutal-white flex items-center justify-center mb-4">
                <Sparkles className="h-7 w-7 text-brutal-charcoal" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brutal-black font-mono uppercase">Active Capsules</h3>
              <p className="text-brutal-charcoal text-sm font-mono">
                Concentrated active ingredients targeting specific skin concerns and conditions.
              </p>
            </div>
            
            <div className="bg-brutal-white p-6 border-4 border-brutal-black flex flex-col items-center text-center transform transition-all hover:translate-x-1 hover:translate-y-1">
              <div className="h-14 w-14 border-4 border-brutal-black bg-brutal-white flex items-center justify-center mb-4">
                <Droplets className="h-7 w-7 text-brutal-charcoal" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brutal-black font-mono uppercase">Fragrance Capsules</h3>
              <p className="text-brutal-charcoal text-sm font-mono">
                Optional scent additions to enhance the sensory experience of the product.
              </p>
            </div>
          </div>
          
          <div className="bg-brutal-white p-8 border-4 border-brutal-black mb-12">
            <div className="flex items-center gap-6 mb-6 border-b-4 border-brutal-black pb-4">
              <div className="flex items-center gap-2">
                <List className="h-5 w-5 text-brutal-charcoal" />
                <span className="font-semibold text-brutal-black font-mono uppercase">INCI Lists</span>
                <span className="text-sm text-brutal-charcoal font-mono">Full ingredient declarations</span>
              </div>
              
              <Separator orientation="vertical" className="h-6 bg-brutal-black" />
              
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-brutal-charcoal" />
                <span className="font-semibold text-brutal-black font-mono uppercase">Ingredient Breakdowns</span>
                <span className="text-sm text-brutal-charcoal font-mono">Detailed composition information</span>
              </div>
            </div>
            
            <EmmaIngredientsSplit />
          </div>
          
          {!isLoading && !error && filteredIngredientsWithoutEquipment.length > 0 && (
            <div className="mb-12 overflow-hidden">
              <div className="border-4 border-brutal-black p-1">
                <div className="relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-brutal-charcoal"></div>
                  <div className="p-8 bg-brutal-white border-2 border-brutal-black">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-12 w-12 border-4 border-brutal-black bg-brutal-white flex items-center justify-center">
                        <FlaskConical className="h-6 w-6 text-brutal-charcoal" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-brutal-black font-mono uppercase">Formula Creator</h2>
                        <p className="text-brutal-charcoal font-mono">Mix and match capsules to visualize your custom product</p>
                      </div>
                    </div>
                    <EmmaProductSimulator ingredients={filteredIngredientsWithoutEquipment} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmmaIngredientsPage;
