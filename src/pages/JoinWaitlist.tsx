
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";

const JoinWaitlist = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Store the email in Supabase
      const { error } = await supabase
        .from('waitlist_emails')
        .insert({ email: email.toLowerCase().trim() });

      if (error) {
        // Check if it's a duplicate email
        if (error.code === '23505') {
          // This is still a success case - they're already on the waitlist
          toast({
            title: "You're already on our waitlist!",
            description: "Redirecting you to complete your registration.",
          });
        } else {
          throw error;
        }
      } else {
        // Show success toast
        toast({
          title: "Thank you!",
          description: "Your email has been received. Redirecting you to complete registration.",
        });
      }
      
      // Save to localStorage as a backup
      localStorage.setItem("waitlistEmail", email);
      
      // Redirect after a short delay with email as a URL parameter
      setTimeout(() => {
        navigate(`/waitlist-redirect?email=${encodeURIComponent(email)}`);
      }, 1500);
    } catch (error) {
      console.error("Error saving email:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brutal-white">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto py-16">
          <div className="brutal-card p-6">
            <h1 className="text-2xl md:text-3xl font-mono uppercase font-semibold text-brutal-black mb-6 text-center">
              Join Our Waitlist
            </h1>
            
            <p className="text-brutal-black mb-6 text-center">
              Be among the first 100 spas to get access to our AI-powered platform.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-mono uppercase mb-2">
                  Your Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border-2 border-brutal-black"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="brutal-button w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Continue to Registration"}
              </Button>
            </form>
            
            <p className="text-sm text-brutal-gray mt-4 text-center">
              Your information is secure and will not be shared with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinWaitlist;
