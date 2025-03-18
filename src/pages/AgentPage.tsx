import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Add a simple skeleton loader component with inline styles
const SkeletonLoader = () => (
  <div style={{ margin: "20px 0" }}>
    <div style={{ backgroundColor: "#e0e0e0", borderRadius: "4px", width: "60%", height: "20px", marginBottom: "10px" }}></div>
    <div style={{ backgroundColor: "#e0e0e0", borderRadius: "4px", width: "80%", height: "15px", marginBottom: "10px" }}></div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ backgroundColor: "#e0e0e0", borderRadius: "4px", width: "100%", height: "15px", marginBottom: "10px" }}></div>
      <div style={{ backgroundColor: "#e0e0e0", borderRadius: "4px", width: "100%", height: "15px", marginBottom: "10px" }}></div>
      <div style={{ backgroundColor: "#e0e0e0", borderRadius: "4px", width: "100%", height: "15px", marginBottom: "10px" }}></div>
    </div>
  </div>
);

const AgentSkeleton = () => {
  return (
    <div style={{ margin: "20px 0", display: "flex", justifyContent: "center" }}>
      {/* Single large circular avatar */}
      <div style={{ 
        backgroundColor: "#e0e0e0", 
        borderRadius: "50%", 
        width: "200px", 
        height: "200px"
      }}></div>
    </div>
  );
};

const AgentPage = () => {
  const location = useLocation();
  const { websiteUrl } = location.state || {};
  const [spaDetails, setSpaDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!websiteUrl) return;

    const fetchSpaDetails = async () => {
      try {
        const response = await fetch("https://facultyofskin.app.n8n.cloud/webhook/spa-ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: websiteUrl }),
        });

        if (!response.ok) throw new Error("Failed to fetch spa details");

        const data = await response.json();
        setSpaDetails(data);
      } catch (err) {
        //setError(err.message);
      } finally {
        //setLoading(false);
      }
    };

    fetchSpaDetails();
  }, [websiteUrl]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fa", padding: "40px 0" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2.5rem", color: "#2d3748", marginBottom: "10px" }}>Your Spa Assistant</h1>
          <p style={{ fontSize: "1.2rem", color: "#4a5568", fontWeight: "300" }}>We're creating a custom assistant for your spa</p>
        </div>
        
        <div style={{ backgroundColor: "white", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)", overflow: "hidden" }}>
          <div style={{ padding: "25px", borderBottom: "1px solid #edf2f7" }}>
            {loading ? <SkeletonLoader /> : (
              <>
                <h2>🌿 {spaDetails.name}</h2>
                <p><strong>Website:</strong> {websiteUrl}</p>
              </>
            )}
          </div>
          
          <div style={{ padding: "25px", borderBottom: "1px solid #edf2f7" }}>
            <h3 style={{ color: "#4a5568", fontSize: "1.25rem", marginBottom: "20px", fontWeight: "600" }}>Services</h3>
            {loading ? <SkeletonLoader /> : (
              <>
                <h3>💆 Services Offered:</h3>
                <ul>
                  {spaDetails.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          
          <div style={{ padding: "25px", borderBottom: "1px solid #edf2f7" }}>
            <h3 style={{ color: "#4a5568", fontSize: "1.25rem", marginBottom: "20px", fontWeight: "600" }}>Business Hours</h3>
            {loading ? <SkeletonLoader /> : (
              <>
                <h3>🕒 Business Hours:</h3>
                <ul>
                  {spaDetails.hours.map((hour, index) => (
                    <li key={index}>{hour}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div style={{ padding: "25px", borderBottom: "1px solid #edf2f7" }}>
            <h3 style={{ color: "#4a5568", fontSize: "1.25rem", marginBottom: "20px", fontWeight: "600" }}>Reviews</h3>
            {loading ? <SkeletonLoader /> : (
              <>
                <h3>� Reviews</h3>
                <ul>
                  {spaDetails.reviews.map((review, index) => (
                    <li key={index}>{review}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          
          <div style={{ padding: "25px" }}>
            <h3 style={{ color: "#4a5568", fontSize: "1.25rem", marginBottom: "20px", fontWeight: "600" }}>Your  Assistant</h3>
            {loading ? <AgentSkeleton /> : (
              <>
                <h3>🎙️ Meet Jess:</h3>
                <p>We've created an Jess for your spa based on the details from your website.</p>
                <button style={{ backgroundColor: "#3182ce", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" }}>Join the Waitlist</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPage;
