
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
            <FormLabel className="font-mono uppercase">Email</FormLabel>
            <FormControl>
              <Input 
                placeholder="you@example.com" 
                className="border-2 border-brutal-black" 
                type="email"
                autoComplete={isSignUp ? "email" : "username"}
                {...field} 
                disabled={disabled}
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
            <FormLabel className="font-mono uppercase">Password</FormLabel>
            <FormControl>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="border-2 border-brutal-black" 
                autoComplete={isSignUp ? "new-password" : "current-password"}
                {...field} 
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
