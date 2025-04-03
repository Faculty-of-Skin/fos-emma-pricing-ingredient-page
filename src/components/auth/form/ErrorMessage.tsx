
interface ErrorMessageProps {
  authError: string | null;
}

export const ErrorMessage = ({ authError }: ErrorMessageProps) => {
  if (!authError) return null;
  
  return (
    <div className="mb-4 p-3 bg-brutal-charcoal border border-brutal-black text-brutal-white rounded-md text-xs">
      <h4 className="font-bold mb-1 text-sm">Authentication Failed</h4>
      <p className="break-words overflow-hidden">{authError}</p>
    </div>
  );
};
