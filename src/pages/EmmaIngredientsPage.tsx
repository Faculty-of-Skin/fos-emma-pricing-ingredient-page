
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { EmmaIngredients } from "@/components/emma/ingredients/EmmaIngredients";

const EmmaIngredientsPage = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 max-w-7xl py-6">
        <h1 className="text-3xl font-bold mb-6">Emma Ingredients Database</h1>
        <p className="text-muted-foreground mb-6">
          Browse the complete database of Emma ingredients, including formulations, pricing, and details for different distribution channels.
        </p>
        <EmmaIngredients />
      </div>
    </DashboardLayout>
  );
};

export default EmmaIngredientsPage;
