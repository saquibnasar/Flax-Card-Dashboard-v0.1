import z from "zod";

export const UserFormSchema = z.object({
  name: z
    .string()
    .min(3, "Minimum 3 character required")
    .max(30, "Maximum 30 characters are allowed"),
  jobTitle: z
    .string()
    .min(3, "Minimum 3 character required")
    .max(36, "Maximum 36 characters"),
  bio: z.string().max(160, "Bio Should not be more than 160 characters"),
  companyName: z.string().optional(),
  profileUrl: z.string().optional(),
  employeeId: z.string().optional(),
});

export const PrimaryCardSchema = UserFormSchema.extend({
  companyName: z.string().min(3, "Minimum 3 character required"),
});

export const SecondaryCardSchema = UserFormSchema.extend({
  profileUrl: z.string().min(3, "This field is required"),
  employeeId: z.string().min(3, "This field is required"),
});

export const userLinkSchema = z.object({
  email: z.string(),
  x: z.string(),
  behance: z.string(),
  linkedIn: z.string(),
  pinterest: z.string(),
  instagram: z.string(),
});

export const SocialMediaSchema = z.object({
  profileLink: z.string(),
  linkTitle: z.string(),
});

export const EmbedMediaSchema = z.object({
  title: z.string(),
  // .min(3, "This is required field").optional()
  value: z.string().min(3, "This is required field"),
});

export const UserSchema = z.object({
  fullName: z.string().min(3).optional(),
  email: z.string().email(),
  password: z.string().min(4),
  otp: z.string().min(4).optional(),
});
