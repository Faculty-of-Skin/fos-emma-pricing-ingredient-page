
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { AuthFormValues } from "@/utils/auth/validation";

interface NameFieldsProps {
  form: UseFormReturn<AuthFormValues>;
  disabled: boolean;
}

export const NameFields = ({ form, disabled }: NameFieldsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-mono uppercase">First Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="John" 
                className="border-2 border-brutal-black" 
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
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-mono uppercase">Last Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Doe" 
                className="border-2 border-brutal-black" 
                {...field} 
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
