import { useState } from "react";

type ErrorObject = Record<string, string>;

export function useFormErrors() {
  const [errors, setErrors] = useState<ErrorObject>({});

  const setFieldError = (field: string, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  };

  const setMultipleErrors = (errorObj: ErrorObject) => {
    setErrors(errorObj);
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return {
    errors,
    setFieldError,
    setMultipleErrors,
    clearError,
    clearAllErrors,
  };
}
