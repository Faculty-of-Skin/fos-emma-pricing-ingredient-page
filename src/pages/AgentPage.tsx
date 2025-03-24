import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { MapPin, Clock, Info, Bot, MessageSquareQuote, Bell, X, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

// Define expected structure
interface SpaWebsiteDetails {
  businessName?: string;
  hours?: { day: string; time: string, hours: string }[];
  location?: { address?: string; mapUrl?: string };
  testimonials?: { text: string; author?: string }[];
  contactInfo?: {
    email?: string;
    phone?: string;
  };
}

// Skeleton Loader
const SkeletonLoader = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-6 w-3/5 bg-brutal-gray rounded-md border border-brutal-black"></div>
    <div className="h-5 w-4/5 bg-brutal-gray rounded-md border border-brutal-black"></div>
    <div className="h-5 w-full bg-brutal-gray rounded-md border border-brutal-black"></div>
  </div>
);

// Agent Avatar Skeleton
const AgentSkeleton = () => (
  <div className="flex flex-col items-center my-8 animate-pulse">
    <div className="h-40 w-40 bg-brutal-gray rounded-full border-4 border-brutal-black mb-4"></div>
    <div className="h-6 w-48 bg-brutal-gray rounded-md border border-brutal-black"></div>
  </div>
);

// Section Skeleton
const SectionSkeleton = ({ title, icon: Icon }: { title: string, icon: React.ElementType }) => (
  <div className="bg-spa-cream border-4 border-brutal-black shadow-lg p-8 rounded-lg mb-6">
    <h3 className="text-xl font-semibold text-brutal-black mb-4 flex items-center font-mono uppercase">
      <Icon className="h-5 w-5 mr-2 text-brutal-dark" /> 
      {title}
    </h3>
    <SkeletonLoader />
  </div>
);

const AgentPage: React.FC = () => {
  const location = useLocation();
  const { websiteUrl } = location.state || {};
  const [spaWebsiteDetails, setSpaWebsiteDetails] = useState<SpaWebsiteDetails>({});
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [companySummary, setCompanySummary] = useState<string>("");
  const [summaryLoading, setSummaryLoading] = useState<boolean>(true);
  const [agentLoading, setAgentLoading] = useState<boolean>(true);
  const [showNotifyDialog, setShowNotifyDialog] = useState<boolean>(false);
  const [notifyEmail, setNotifyEmail] = useState<string>("");
  const [notifyPhone, setNotifyPhone] = useState<string>("");
  const [notifyFirstName, setNotifyFirstName] = useState<string>("");
  const [notificationSubmitted, setNotificationSubmitted] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>("");
  
  const getWebsiteDetails = useCallback(async () => {
    try {
      // Make sure we have a URL to process
      if (!websiteUrl) {
        console.error("No website URL provided");
        navigate("/");
        return;
      }
      
      const response = await fetch(`https://facultyofskin.app.n8n.cloud/webhook/80c7e3a9-3bfd-49e2-a9b3-5b3805f0b3c8`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          websiteUrl,
        }),
      });
      
      // Handle the response regardless of status code
      const data = await response.json();
      
      if (data) {
        setSpaWebsiteDetails(data);
        setLoading(false);
      } else {
        console.error("No data received from webhook");
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching website details:", error);
      navigate("/");
    }
  }, [websiteUrl, navigate]);

  useEffect(() => {
    if (websiteUrl && !spaWebsiteDetails.businessName) {
      getWebsiteDetails();
    }
  }, [websiteUrl, navigate, getWebsiteDetails, spaWebsiteDetails.businessName]);

  // Move company summary to a separate useEffect that depends on spaWebsiteDetails
  useEffect(() => {
    const getCompanySummary = async () => {
      try {
        if (!spaWebsiteDetails.businessName) return;
        
        setSummaryLoading(true);
        
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
        const response = await fetch(`https://fos-server-140931751981.us-central1.run.app/spasense/createCompanySummary`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify({
            websiteData: spaWebsiteDetails,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          
          setCompanySummary(data.data);
        } else {
          console.error("Error fetching company summary:", response.status);
        } 
      } catch (error) {
        console.error("Error fetching company summary:", error);
      } finally {
        setSummaryLoading(false);
      }
    };

    if (spaWebsiteDetails.businessName && !companySummary) {
      getCompanySummary();
    }
  }, [spaWebsiteDetails, companySummary]);

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!spaWebsiteDetails.businessName) {
        console.error("No business name found");
        return;
      }

      if (!notifyEmail && !notifyPhone) {
        setValidationError("Please enter an email or phone number to be notified.");
        return;
      }
      
      setValidationError(""); // Clear any previous errors
      
      // Here you would typically send the notification data to your backend
      const response = await fetch(`https://facultyofskin.app.n8n.cloud/webhook/92f6986f-94e5-45dc-b063-3563fc42b353`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: notifyEmail,
          phone: notifyPhone,
          firstName: notifyFirstName,
          businessName: spaWebsiteDetails.businessName,
        }),
      });

      if (response.ok) {
        setNotificationSubmitted(true);
        // Close dialog after a delay
        setTimeout(() => {
          setShowNotifyDialog(false);
          setNotificationSubmitted(false);
        }, 2000);
      } else {
        console.error("Error sending notification");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  useEffect(() => {
    document.title = spaWebsiteDetails.businessName
      ? `${spaWebsiteDetails.businessName} - Spa Details`
      : "Spa Details";
  }, [spaWebsiteDetails.businessName]);

  return (
    <div className="min-h-screen bg-spa-beige p-8 flex items-center justify-center font-sans">
      <div className="w-full max-w-3xl">
        
        {/* Header Section - Always shown */}
        <div className="bg-white border-4 border-brutal-black shadow-lg p-8 rounded-lg mb-6">
          <div className="text-center py-4">
            <h1 className="text-3xl font-bold text-brutal-black font-mono uppercase">
              {loading ? (
                <span className="block h-10 w-3/4 bg-brutal-gray rounded-md border border-brutal-black mx-auto animate-pulse"></span>
              ) : (
                spaWebsiteDetails.businessName || "Your Spa Assistant"
              )}
            </h1>
          </div>
        </div>

        {/* Company Description Section - Always shown */}
        {summaryLoading ? (
          <SectionSkeleton title="About" icon={Info} />
        ) : (
          <div className="bg-spa-cream border-4 border-brutal-black shadow-lg p-8 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-brutal-black mb-4 flex items-center font-mono uppercase">
              <Info className="h-5 w-5 mr-2 text-brutal-dark" /> 
              About
            </h3>
            <div className="text-brutal-charcoal text-lg">
              {companySummary ? (
                <ReactMarkdown>
                  {companySummary}
                </ReactMarkdown>
              ) : (
                "No company description available"
              )}
            </div>
          </div>
        )}

        {/* Agent Avatar - Moved up below the about section */}
        <div className="bg-spa-cream border-4 border-brutal-black shadow-lg p-8 rounded-lg mb-6">
          <div className="flex items-center justify-center mb-4">
            <Bot className="h-6 w-6 mr-2 text-brutal-dark flex-shrink-0" />
            {!agentLoading ? (
              <h3 className="text-xl font-semibold text-brutal-black font-mono uppercase m-0">
                We built a custom assistant
              </h3>
            ) : (
              <h3 className="text-xl font-semibold text-brutal-black font-mono uppercase m-0">
                We are building a custom assistant
              </h3>
            )}
          </div>
          
          {/* Business name on a new line */}
          <p className="text-lg font-bold text-brutal-dark text-center mb-6 -mt-2">
            for {spaWebsiteDetails.businessName || "your spa"}!
          </p>
          
          {agentLoading ? (
            <>
              <AgentSkeleton />
              <div className="flex justify-center">
                <button 
                  disabled={loading}
                  className="mt-4 bg-brutal-pink hover:bg-brutal-pink/80 text-brutal-black font-bold py-2 px-6 rounded-md border-2 border-brutal-black shadow-brutal transition-all hover:translate-y-[-2px] hover:shadow-brutal-lg flex items-center"
                  onClick={() => setShowNotifyDialog(true)}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notify Me
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="h-40 w-40 rounded-full border-4 border-brutal-black overflow-hidden shadow-lg mb-4">
                <img
                  src="https://source.unsplash.com/400x400/?spa,wellness"
                  alt="Agent"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-brutal-charcoal text-center">
                Meet Jess, your personal spa assistant!
              </p>
            </div>
          )}
        </div>

        {/* Business Hours Section - Only shown if hours exist and have valid data */}
        {loading ? (
          <SectionSkeleton title="Business Hours" icon={Clock} />
        ) : (
          spaWebsiteDetails.hours && 
          spaWebsiteDetails.hours.length > 0 && (
            <div className="bg-clay-cream border-4 border-brutal-black shadow-lg p-8 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-clay-forest mb-4 flex items-center font-mono uppercase">
                <Clock className="h-5 w-5 mr-2 text-brutal-dark" /> Business Hours
              </h3>
              <ul className="space-y-2">
                {spaWebsiteDetails.hours.map((hour, index) => (
                  <li key={index} className="text-brutal-charcoal text-lg">
                    <strong className="text-clay-forest">{hour.day}:</strong> {hour.time ? hour.time : hour.hours}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}

        {/* Location Section - Only shown if address exists */}
        {loading ? (
          <SectionSkeleton title="Location" icon={MapPin} />
        ) : (
          spaWebsiteDetails.location && 
          spaWebsiteDetails.location.address && 
          spaWebsiteDetails.location.address !== "No information found" && (
            <div className="bg-brutal-white border-4 border-brutal-black shadow-lg p-8 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-brutal-black mb-4 flex items-center font-mono uppercase">
                <MapPin className="h-5 w-5 mr-2 text-brutal-dark" /> Location
              </h3>
              <div>
                <p className="text-brutal-charcoal text-lg">{spaWebsiteDetails.location.address}</p>
                {spaWebsiteDetails.location.mapUrl && 
                 spaWebsiteDetails.location.mapUrl !== "No information found" && (
                  <a 
                    href={spaWebsiteDetails.location.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brutal-dark font-bold hover:underline bg-brutal-pink px-4 py-2 inline-block mt-3 border-2 border-brutal-black"
                  >
                    View on Map
                  </a>
                )}
              </div>
            </div>
          )
        )}

        {/* Testimonials Section - Only shown if testimonials exist */}
        {!loading && spaWebsiteDetails.testimonials && 
         spaWebsiteDetails.testimonials.length > 0 && 
         spaWebsiteDetails.testimonials[0].text !== "No information found" && (
          <div className="bg-brutal-pink border-4 border-brutal-black shadow-lg p-8 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-brutal-black mb-4 flex items-center font-mono uppercase">
              <MessageSquareQuote className="h-5 w-5 mr-2 text-brutal-dark" /> Testimonials
            </h3>
            <div className="space-y-4">
              {spaWebsiteDetails.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white border-2 border-brutal-black p-4 rounded-lg">
                  <p className="text-brutal-charcoal italic">"{testimonial.text}"</p>
                  {testimonial.author && (
                    <p className="text-brutal-dark font-semibold text-right mt-2">- {testimonial.author}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notification Dialog */}
      {showNotifyDialog && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowNotifyDialog(false)}
        >
          <div 
            className="bg-white opacity-90 border-4 border-brutal-black shadow-brutal-lg rounded-lg p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowNotifyDialog(false)}
              className="absolute top-2 right-2 text-brutal-black hover:text-brutal-dark"
            >
              <X className="h-6 w-6" />
            </button>
            
            <h3 className="text-xl font-bold text-brutal-black mb-4 font-mono uppercase text-center">
              Get Notified
            </h3>
            
            {notificationSubmitted ? (
              <div className="text-center py-8">
                <p className="text-brutal-dark text-lg font-bold">Thank you!</p>
                <p>We'll notify you when your assistant is ready.</p>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="space-y-4">
                <div>
                  <label className="text-brutal-dark font-bold mb-2 flex items-center">
                    <span className="mr-2">�</span> First Name
                  </label>
                  <input
                    type="text"
                    value={notifyFirstName}
                    onChange={(e) => setNotifyFirstName(e.target.value)}
                    className="w-full p-2 border-2 border-brutal-black rounded-md focus:outline-none focus:ring-2 focus:ring-brutal-pink"
                    placeholder="Your first name"
                  />
                </div>
                
                <div>
                  <label className="text-brutal-dark font-bold mb-2 flex items-center">
                    <Mail className="h-4 w-4 mr-2" /> Email
                  </label>
                  <input
                    type="email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    className="w-full p-2 border-2 border-brutal-black rounded-md focus:outline-none focus:ring-2 focus:ring-brutal-pink"
                    placeholder={`name@${spaWebsiteDetails.businessName}.com`}
                  />
                </div>
                
                <div>
                  <label className="text-brutal-dark font-bold mb-2 flex items-center">
                    <Phone className="h-4 w-4 mr-2" /> Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    value={notifyPhone}
                    onChange={(e) => setNotifyPhone(e.target.value)}
                    className="w-full p-2 border-2 border-brutal-black rounded-md focus:outline-none focus:ring-2 focus:ring-brutal-pink"
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                {validationError && (
                  <div className="text-red-600 font-bold text-sm p-2 bg-red-100 border border-red-300 rounded">
                    {validationError}
                  </div>
                )}
                
                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    className="bg-brutal-pink hover:bg-brutal-pink/80 text-brutal-black font-bold py-2 px-6 rounded-md border-2 border-brutal-black shadow-brutal transition-all hover:translate-y-[-2px] hover:shadow-brutal-lg flex items-center"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notify Me
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentPage;
