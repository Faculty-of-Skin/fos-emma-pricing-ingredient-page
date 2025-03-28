
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const UnlockPricingSection = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth');
  };
  
  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="brutal-card mb-6 bg-brutal-black text-brutal-white p-6">
          <div className="text-center">
            <h2 className="text-2xl font-black font-mono uppercase mb-3">Unlock Full Pricing Details</h2>
            <p className="font-mono mb-4 max-w-2xl mx-auto">
              For comprehensive pricing information, including exclusive rates for importers and distributors, please Log In.
              Detailed insights into cost structures and bulk purchasing options are available upon login.
            </p>
            <Button 
              onClick={handleLoginClick}
              className="bg-brutal-white text-brutal-black hover:bg-brutal-gray border-2 border-brutal-white hover:border-brutal-gray font-mono uppercase"
            >
              Log In Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
