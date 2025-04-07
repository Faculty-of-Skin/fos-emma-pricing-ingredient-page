
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileSearch, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brutal-white p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="border-4 border-brutal-black p-8 bg-brutal-white shadow-[8px_8px_0px_0px_rgba(40,54,24,1)] transition-all animate-fade-down">
          <div className="mx-auto w-24 h-24 rounded-full bg-brutal-charcoal flex items-center justify-center mb-6">
            <FileSearch size={48} className="text-brutal-white" />
          </div>
          
          <h1 className="text-8xl font-mono font-bold tracking-tighter mb-2">404</h1>
          <div className="w-full h-2 bg-brutal-black mb-4"></div>
          
          <h2 className="text-2xl font-mono uppercase tracking-wide mb-4">Page Not Found</h2>
          <p className="text-brutal-black/80 mb-6">
            Oops! We couldn't find the page you're looking for.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-2 border-brutal-black text-brutal-black hover:bg-brutal-black/10 font-mono uppercase tracking-wider flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Go Back
            </Button>
            
            <Button 
              onClick={() => navigate("/")}
              className="bg-brutal-black text-brutal-white border-2 border-brutal-black hover:bg-brutal-dark font-mono uppercase tracking-wider flex items-center gap-2"
            >
              <Home size={16} />
              Return Home
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-brutal-black/60">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
