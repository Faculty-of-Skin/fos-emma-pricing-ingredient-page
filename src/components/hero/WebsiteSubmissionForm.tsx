
import { Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface WebsiteSubmissionFormProps {
  className?: string;
}

export const WebsiteSubmissionForm = ({ className }: WebsiteSubmissionFormProps) => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGlowing, setIsGlowing] = useState(true);
  const { toast } = useToast();
  
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
      // Use the provided n8n webhook URL
      const webhookUrl = "https://facultyofskin.app.n8n.cloud/webhook-test/d154bcba-c78a-405d-a00a-e190a3d4642f";
      
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
    <div className={`max-w-2xl mx-auto p-2 ${className}`}>
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
  );
};
