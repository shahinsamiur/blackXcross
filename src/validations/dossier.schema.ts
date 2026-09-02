import * as yup from "yup";

export const dossierSchema = yup.object({
  displayName: yup
    .string()
    .required("Display name is required")
    .trim()
    .min(2, "Display name must be at least 2 characters")
    .max(50, "Display name must be under 50 characters"),

  bio: yup.string().trim().max(280, "Bio must be under 280 characters"),

  avatarUrl: yup
    .string()
    .trim()
    .url("Please enter a valid image URL")
    .required("Avatar URL is required"),
});
