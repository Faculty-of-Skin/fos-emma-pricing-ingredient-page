
export const SchemaMarkup = () => {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Faculty of Skin Emma",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "description": "Emma Ingredients - Personalized skincare formulation system for professional estheticians and skin therapists.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Explore ingredients and custom formulations"
        }
      })
    }} />
  );
};
