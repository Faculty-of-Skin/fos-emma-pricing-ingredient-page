
interface ErrorMessageProps {
  authError: string | null;
}

export const ErrorMessage = ({ authError }: ErrorMessageProps) => {
  if (!authError) return null;
  
  return (
    <div className="auth-error-message mb-3">
      <h4 className="font-semibold text-xs text-white mb-1">Authentication Failed</h4>
      <p className="break-words overflow-hidden text-white text-xs">{authError}</p>
    </div>
  );
};
