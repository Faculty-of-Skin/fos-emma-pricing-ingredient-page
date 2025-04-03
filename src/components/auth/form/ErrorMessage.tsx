
interface ErrorMessageProps {
  authError: string | null;
}

export const ErrorMessage = ({ authError }: ErrorMessageProps) => {
  if (!authError) return null;
  
  return (
    <div className="auth-error-message mb-4 w-full">
      <h4 className="font-bold mb-2 text-sm text-white">Authentication Failed</h4>
      <p className="break-words overflow-hidden text-white text-opacity-90">{authError}</p>
    </div>
  );
};
