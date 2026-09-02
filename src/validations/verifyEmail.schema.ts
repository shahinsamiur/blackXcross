import * as yup from "yup";

export const verifyEmailSchema = yup.object({
  code: yup
    .string()
    .required("Verification code is required")
    .trim()
    .matches(/^\d{6}$/, "Enter the 6-digit code sent to your email"),
});
