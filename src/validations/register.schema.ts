import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be under 50 characters"),

  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .trim(),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Must contain at least one special character (@$!%*?&#)",
    ),

  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
