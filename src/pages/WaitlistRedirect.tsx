
import { useEffect } from "react";

const WaitlistRedirect = () => {
  useEffect(() => {
    // Track the conversion with Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
    
    // Redirect to Google Form after a short delay
    const timer = setTimeout(() => {
      window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfv8jr6Z5cb-URGZbI8w1-q8uHAXDxH6tTEVRXwQMl4hmvnBw/viewform';
    }, 500); // Short delay to ensure tracking fires
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-brutal-white flex items-center justify-center">
      <div className="text-center brutal-card p-8 max-w-md">
        <h1 className="text-2xl font-mono uppercase mb-4">Redirecting...</h1>
        <p>Please wait while we redirect you to our registration form.</p>
      </div>
    </div>
  );
};

export default WaitlistRedirect;
