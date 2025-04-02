
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { userTypes } from "@/utils/auth/validation";
import { UseFormReturn } from "react-hook-form";
import { AuthFormValues } from "@/utils/auth/validation";

interface UserTypeSelectorProps {
  form: UseFormReturn<AuthFormValues>;
  disabled: boolean;
}

export const UserTypeSelector = ({ form, disabled }: UserTypeSelectorProps) => {
  return (
    <FormField
      control={form.control}
      name="userType"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="font-mono uppercase">Who are you?</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-2 gap-2 p-1"
              disabled={disabled}
            >
              {userTypes.map((type) => (
                <FormItem 
                  key={type} 
                  className="flex items-center space-x-3 space-y-0 p-2 border-2 border-brutal-black rounded"
                >
                  <FormControl>
                    <RadioGroupItem value={type} className="border-brutal-black" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer w-full">{type}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
