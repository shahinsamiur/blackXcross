import * as yup from "yup";

export const caseSchema = yup.object({
  title: yup
    .string()
    .required("Case title is required")
    .trim()
    .min(4, "Title must be at least 4 characters")
    .max(100, "Title must be under 100 characters"),

  description: yup
    .string()
    .required("Description is required")
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be under 500 characters"),

  status: yup
    .mixed<"COLD CASE" | "OPEN CASE">()
    .oneOf(["COLD CASE", "OPEN CASE"], "Select a valid status")
    .required("Status is required"),

  image: yup.mixed<File | string>().test(
    "image-required",
    "Case image is required",
    function (value) {
      if (value instanceof File) return true;
      if (typeof value === "string" && value.trim() !== "") return true;
      return false;
    }
  ),
});