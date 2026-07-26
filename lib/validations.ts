import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.email("Please enter a valid email address."),
  company: z.string().trim().max(100).optional(),
  projectType: z.string().min(1, "Please select a project type."),
  budget: z.string().min(1, "Please select an estimated budget."),
  message: z.string().trim().min(20, "Please write at least 20 characters.").max(3000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
