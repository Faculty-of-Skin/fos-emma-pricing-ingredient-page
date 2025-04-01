
import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  firstName: z.string().min(1, { message: "First name is required" }).optional().or(z.literal('')),
  lastName: z.string().min(1, { message: "Last name is required" }).optional().or(z.literal('')),
});

export type AuthFormValues = z.infer<typeof authSchema>;
