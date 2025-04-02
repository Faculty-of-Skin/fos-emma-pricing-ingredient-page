
import { useCurrency } from "@/context/CurrencyContext";

interface EquipmentSummaryProps {
  machinePackCount: number;
  calibrationKitCount: number;
  thermalPrinterCount: number;
  dermoSmartCount: number;
  totalPrice: number;
}

export const EquipmentSummary = ({
  machinePackCount,
  calibrationKitCount,
  thermalPrinterCount,
  dermoSmartCount,
  totalPrice,
}: EquipmentSummaryProps) => {
  const { formatPrice, convertPrice } = useCurrency();

  return (
    <div className="text-center mt-4 py-3 border-t-2 border-brutal-black/20">
      <p className="text-xl font-bold font-mono text-brutal-black mb-1">
        Total: {formatPrice(convertPrice(totalPrice))}
      </p>
      <p className="text-brutal-charcoal font-mono mt-1 text-sm">
        {machinePackCount} Machine Pack, {calibrationKitCount} Calibration Kit, {thermalPrinterCount} Thermal Printer, {dermoSmartCount} DermoSmart
      </p>
      <p className="text-brutal-charcoal font-mono mt-3 text-sm max-w-2xl mx-auto">
        Build your professional beauty equipment setup with the components you need. Each Emma machine is designed for optimal performance and long-term reliability.
      </p>
    </div>
  );
};
