
interface AccessoriesInfoProps {
  moq: number;
}

export const AccessoriesInfo = ({ moq }: AccessoriesInfoProps) => {
  return (
    <div className="mt-8 grid sm:grid-cols-2 gap-6">
      <div className="brutal-card border-2 bg-brutal-white/70">
        <h3 className="font-mono uppercase text-brutal-black font-bold mb-3">MOQ Information</h3>
        <p className="font-mono text-sm text-brutal-charcoal">
          MOQ (Minimum Order Quantity) for Beauty Institute: {moq} units
        </p>
      </div>
      
      <div className="brutal-card border-2 bg-brutal-white/70">
        <h3 className="font-mono uppercase text-brutal-black font-bold mb-3">Ordering Information</h3>
        <p className="font-mono text-sm text-brutal-charcoal">
          For bulk orders and beauty institute pricing, please contact our sales team directly.
          Custom packaging and branding options are available.
        </p>
      </div>
    </div>
  );
};
