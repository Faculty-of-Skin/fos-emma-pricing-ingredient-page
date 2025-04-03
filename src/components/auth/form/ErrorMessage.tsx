
interface ErrorMessageProps {
  authError: string | null;
}

export const ErrorMessage = ({ authError }: ErrorMessageProps) => {
  if (!authError) return null;
  
  return (
    <div className="mb-4 p-4 bg-brutal-black border border-brutal-charcoal text-brutal-white rounded-md text-xs shadow-md">
      <h4 className="font-bold mb-1 text-sm text-brutal-white">Authentication Failed</h4>
      <p className="break-words overflow-hidden text-brutal-white/90">{authError}</p>
    </div>
  );
};
