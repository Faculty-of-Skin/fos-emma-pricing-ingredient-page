
interface ErrorMessageProps {
  authError: string | null;
}

export const ErrorMessage = ({ authError }: ErrorMessageProps) => {
  if (!authError) return null;
  
  return (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
      {authError}
    </div>
  );
};
