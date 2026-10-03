import * as yup from "yup";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];

export const dossierSchema = yup.object({
  displayName: yup
    .string()
    .required("Display name is required")
    .trim()
    .min(2, "Display name must be at least 2 characters")
    .max(50, "Display name must be under 50 characters"),

  bio: yup
    .string()
    .trim()
    .max(280, "Bio must be under 280 characters")
    .nullable(),

  avatarFile: yup
    .mixed<File>()
    .nullable()
    .test(
      "fileSize",
      "Image must be under 5MB",
      (file) => !file || (file as File).size <= MAX_FILE_SIZE,
    )
    .test(
      "fileType",
      "Only JPG, PNG, or WEBP images are allowed",
      (file) => !file || SUPPORTED_FORMATS.includes((file as File).type),
    ),

  title: yup
    .string()
    .trim()
    .max(50, "Title must be under 50 characters")
    .nullable(),

  location: yup
    .string()
    .trim()
    .max(80, "Location must be under 80 characters")
    .nullable(),

  website: yup
    .string()
    .trim()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .url("Please enter a valid URL (e.g., https://example.com)")
    .max(200, "Website URL must be under 200 characters"),
});
