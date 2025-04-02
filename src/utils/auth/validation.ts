
import { z } from "zod";

export const userTypes = [
  "Individual",
  "Professional",
  "Business Owner",
  "Distributor"
] as const;

export type UserType = typeof userTypes[number];

export const authSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  firstName: z.string().min(1, { message: "First name is required" }).optional().or(z.literal('')),
  lastName: z.string().min(1, { message: "Last name is required" }).optional().or(z.literal('')),
  userType: z.enum(userTypes, {
    required_error: "Please select who you are"
  }),
});

export type AuthFormValues = z.infer<typeof authSchema>;
