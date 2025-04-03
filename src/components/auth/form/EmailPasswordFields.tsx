
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { AuthFormValues } from "@/utils/auth/validation";

interface EmailPasswordFieldsProps {
  form: UseFormReturn<AuthFormValues>;
  disabled: boolean;
  isSignUp: boolean;
}

export const EmailPasswordFields = ({ form, disabled, isSignUp }: EmailPasswordFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-brutal-black font-medium">Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="your@email.com"
                className="brutal-input placeholder:text-brutal-gray/50"
                disabled={disabled}
                {...field}
                autoComplete="email"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-brutal-black font-medium">
              Password
              {isSignUp && <span className="text-brutal-gray ml-1 text-xs">(min. 6 characters)</span>}
            </FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder={isSignUp ? "Create secure password" : "Enter your password"}
                className="brutal-input placeholder:text-brutal-gray/50"
                disabled={disabled}
                {...field}
                autoComplete={isSignUp ? "new-password" : "current-password"}
              />
            </FormControl>
            <FormMessage className="text-xs break-words max-w-full overflow-hidden" />
          </FormItem>
        )}
      />
    </>
  );
};
