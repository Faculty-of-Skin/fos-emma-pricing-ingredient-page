
interface ErrorMessageProps {
  authError: string | null;
}

export const ErrorMessage = ({ authError }: ErrorMessageProps) => {
  if (!authError) return null;
  
  return (
    <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm md:text-base break-words">
      <h4 className="font-bold mb-1">Authentication Failed</h4>
      <p className="whitespace-normal">{authError}</p>
    </div>
  );
};
