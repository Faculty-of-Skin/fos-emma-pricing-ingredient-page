
import { ArrowRight, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const Hero = () => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isGlowing, setIsGlowing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Effect to create the flashing/glowing animation
  useEffect(() => {
    // Only animate for the first 10 seconds to avoid being too distracting
    const glowInterval = setInterval(() => {
      setIsGlowing(prev => !prev);
    }, 1500);
    
    const stopGlowing = setTimeout(() => {
      clearInterval(glowInterval);
      setIsGlowing(false);
    }, 10000);
    
    return () => {
      clearInterval(glowInterval);
      clearTimeout(stopGlowing);
    };
  }, []);
  
  // Validate URL
  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch (err) {
      return false;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate URL
    if (!websiteUrl) {
      toast({
        title: "Error",
        description: "Please enter a website URL",
        variant: "destructive",
      });
      return;
    }
    
    if (!isValidUrl(websiteUrl)) {
      toast({
        title: "Error",
        description: "Please enter a valid URL (include https://)",
        variant: "destructive",
      });
      return;
    }
    
    // Set loading state
    setIsSubmitting(true);
    
    try {
      // Replace with your actual n8n webhook URL
      const webhookUrl = "https://your-n8n-webhook-url";
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          websiteUrl,
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your website has been submitted for analysis.",
        });
        // Clear form after successful submission
        setWebsiteUrl("");
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center bg-brutal-white pt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
          <div className="inline-block px-4 py-1.5 bg-brutal-black text-brutal-white font-mono uppercase tracking-wider mb-6 border-4 border-brutal-black">
            <span role="text" aria-label="Special offer" className="relative">
              <span className="absolute -inset-1 bg-brutal-dark blur opacity-30"></span>
              ✨ Limited Time: Join Our Pilot Program
            </span>
          </div>
          
          <header className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brutal-black leading-tight font-mono uppercase relative">
              <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                The AI Assistant
              </span>
              <span className="block relative">
                <span className="absolute -inset-1 bg-brutal-gray blur opacity-30"></span>
                For Your Spa Business
              </span>
              <div className="absolute -right-4 -top-4 w-20 h-20 border-4 border-brutal-black rotate-12 bg-brutal-dark opacity-20"></div>
              <div className="absolute -left-4 -bottom-4 w-16 h-16 border-4 border-brutal-black -rotate-12 bg-brutal-gray opacity-20"></div>
            </h1>
          </header>
          
          <p className="text-xl text-brutal-charcoal max-w-2xl mx-auto font-mono relative">
            <span className="relative z-10">
              Boost retail sales, reduce no-shows, automate client interactions, and enhance your reputation.
            </span>
            <svg className="absolute -right-8 top-0 text-brutal-dark opacity-20" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="4"/>
            </svg>
          </p>

          <div className="max-w-2xl mx-auto p-2">
            <form 
              onSubmit={handleSubmit} 
              className="flex relative w-full"
            >
              <div className="relative w-full">
                {/* Glow effect behind the input box */}
                {isGlowing && (
                  <div className="absolute inset-0 bg-[#dda15e] blur-md opacity-50 animate-pulse"></div>
                )}
                <div className="w-full flex items-center rounded-md bg-white shadow-lg border-4 border-brutal-black overflow-hidden transition-all duration-300 relative z-10">
                  <div className="pl-4">
                    <Search className="h-5 w-5 text-brutal-charcoal" />
                  </div>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="enter your website URL"
                    className="w-full pl-2 pr-4 py-3 focus:outline-none text-brutal-charcoal font-mono text-lg border-none"
                    aria-label="Enter your website URL"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-brutal-dark hover:bg-brutal-black transition-colors text-white font-bold py-2 px-4 font-mono uppercase text-sm md:text-base flex items-center justify-center min-w-[40px] mr-4 my-1 ${isSubmitting ? 'opacity-70' : ''}`}
                    aria-label="Analyze website"
                  >
                    {isSubmitting ? "..." : "GO"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="text-center mt-20">
            <p className="text-brutal-charcoal text-sm uppercase tracking-wider mb-8 font-mono">
              Works with your favorite spa software
            </p>
            <div className="brutal-card" role="list" aria-label="Supported spa software platforms">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-center justify-center">
                <div className="flex items-center justify-center h-16">
                  <img 
                    src="/lovable-uploads/914a0018-31ba-4882-8d5a-f97c77921a0a.png" 
                    alt="Vagaro spa management software" 
                    className="h-8 w-auto object-contain" 
                  />
                </div>
                <div className="flex items-center justify-center h-16">
                  <img 
                    src="/lovable-uploads/4e8f1b0e-d148-4ce6-b43c-79631a6ad14f.png" 
                    alt="Fresha spa booking system" 
                    className="h-8 w-auto object-contain" 
                  />
                </div>
                <div className="flex items-center justify-center h-16">
                  <img 
                    src="/lovable-uploads/e7d663d7-1652-4978-8d2e-fbd5afac95b5.png" 
                    alt="Mangomint spa business software" 
                    className="h-8 w-auto object-contain" 
                  />
                </div>
                <div className="flex items-center justify-center h-16">
                  <img 
                    src="/lovable-uploads/53c24c90-400a-44f6-a9bc-2205d1721e88.png" 
                    alt="MINDBODY spa management platform" 
                    className="h-8 w-auto object-contain" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "SpaSense",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "description": "AI-powered assistant for spa business management. Automates bookings, reduces no-shows, and increases retail sales.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "30-day free trial"
          }
        })
      }} />
    </section>
  );
};
