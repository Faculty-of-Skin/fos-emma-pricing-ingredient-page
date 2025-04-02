
import { Loader2 } from "lucide-react";
import { EquipmentCard } from "./equipment/EquipmentCard";
import { useEquipmentProducts } from "./equipment/useEquipmentProducts";

export const EquipmentSection = () => {
  const { isLoading, error, equipmentProducts, getProductPrice } = useEquipmentProducts();
  
  // Define the equipment items we want to display
  const equipmentItems = [
    { 
      reference: "AE101", 
      title: "Emma Machine Pack",
      description: "Equip your institute with the latest in skincare technology, designed for bespoke beauty experiences.",
    },
    { 
      reference: "AE201", 
      title: "Calibration Kit",
      description: "Essential for ensuring your equipment operates with precision and accuracy.",
    },
    { 
      reference: "AE600", 
      title: "Thermal Printer",
      description: "Streamline your operations with on-site printing for client treatment plans and receipts.",
    },
    { 
      reference: "AE500", 
      title: "Chowis DermoSmart",
      description: "An advanced diagnostic tool that enhances treatment personalization and effectiveness.",
    }
  ];
  
  return (
    <section className="py-4" data-section="equipment">
      <div className="container mx-auto px-4">
        <div className="brutal-card mb-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-black text-brutal-black font-mono uppercase">Equipment</h2>
            <p className="text-brutal-charcoal font-mono mt-2">
              Equip your beauty institute with state-of-the-art technology designed to enhance the client experience and improve treatment outcomes.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading equipment data...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {equipmentItems.map((item, index) => {
                const price = getProductPrice(item.reference);
                const productData = equipmentProducts.find(product => product.reference === item.reference);
                
                return (
                  <EquipmentCard 
                    key={index}
                    title={item.title}
                    reference={item.reference}
                    price={price}
                    description={productData?.description || item.description}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
