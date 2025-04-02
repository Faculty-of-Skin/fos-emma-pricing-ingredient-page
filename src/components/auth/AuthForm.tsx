
import { Form } from "@/components/ui/form";
import { NameFields } from "./form/NameFields";
import { UserTypeSelector } from "./form/UserTypeSelector";
import { EmailPasswordFields } from "./form/EmailPasswordFields";
import { CooldownMessage } from "./form/CooldownMessage";
import { ErrorMessage } from "./form/ErrorMessage";
import { SubmitButton } from "./form/SubmitButton";
import { useAuthForm } from "./form/useAuthForm";

interface AuthFormProps {
  isSignUp: boolean;
  isLoading: boolean;
  authError: string | null;
  canSubmit: boolean;
  onSubmitSuccess?: () => void;
  onToggleMode: () => void;
}

export const AuthForm = ({
  isSignUp,
  authError,
  onSubmitSuccess,
}: AuthFormProps) => {
  const { form, cooldownRemaining, isLoading, onSubmit } = useAuthForm({
    isSignUp,
    onSubmitSuccess
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ErrorMessage authError={authError} />
        <CooldownMessage cooldownRemaining={cooldownRemaining} />
        
        {isSignUp && (
          <>
            <NameFields form={form} disabled={isLoading || cooldownRemaining > 0} />
            <UserTypeSelector form={form} disabled={isLoading || cooldownRemaining > 0} />
          </>
        )}
        
        <EmailPasswordFields 
          form={form} 
          disabled={isLoading || cooldownRemaining > 0} 
          isSignUp={isSignUp}
        />
        
        <SubmitButton 
          isSignUp={isSignUp} 
          isLoading={isLoading} 
          cooldownRemaining={cooldownRemaining} 
        />
      </form>
    </Form>
  );
};
