import * as yup from "yup";

export const groupSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Group name must be at least 3 characters.")
    .max(60, "Group name must be under 60 characters.")
    .required("Group name is required."),
  category: yup.string().required("Please select a category."),
  description: yup
    .string()
    .trim()
    .max(300, "Description must be under 300 characters.")
    .required("Description is required."),
  visibility: yup
    .mixed<"public" | "private">()
    .oneOf(["public", "private"])
    .required(),
});

export type GroupFormValues = yup.InferType<typeof groupSchema>;