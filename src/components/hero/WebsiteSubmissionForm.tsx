import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export interface WebsiteSubmissionFormProps {
  className?: string;
}

export const WebsiteSubmissionForm = ({ className }: WebsiteSubmissionFormProps) => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGlowing, setIsGlowing] = useState(true);
  const navigate = useNavigate();
  
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
      return;
    }
    
    if (!isValidUrl(websiteUrl)) {
      return;
    }
    
    // Set loading state
    setIsSubmitting(true);
  
    // Redirect to the AgentPage with the website URL and parsed data
    navigate('/agent', { state: { websiteUrl } });
    // Clear form after successful submission
    setWebsiteUrl("");

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

export default WebsiteSubmissionForm;
