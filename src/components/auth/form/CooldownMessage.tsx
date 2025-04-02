
interface CooldownMessageProps {
  cooldownRemaining: number;
}

export const CooldownMessage = ({ cooldownRemaining }: CooldownMessageProps) => {
  if (cooldownRemaining <= 0) return null;
  
  return (
    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-md text-sm">
      Please wait {cooldownRemaining} seconds before trying again.
    </div>
  );
};
