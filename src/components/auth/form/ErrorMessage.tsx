
interface ErrorMessageProps {
  authError: string | null;
}

export const ErrorMessage = ({ authError }: ErrorMessageProps) => {
  if (!authError) return null;
  
  return (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-xs break-words max-w-full">
      <h4 className="font-bold mb-1 text-sm">Authentication Failed</h4>
      <p className="whitespace-normal break-words text-wrap overflow-hidden">{authError}</p>
    </div>
  );
};
