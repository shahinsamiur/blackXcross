"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as yup from "yup";
import { FiLock } from "react-icons/fi";
import { Button } from "../../../../utils/Button";
import { useFormErrors } from "../../../../hooks/useFormErrors";
import { resetPasswordSchema } from "../../../../validations/resetPassword.schema";
import { useResetPasswordMutation } from "../../../../state/redux/api/auth";
import PasswordInput from "../../../../components/ui/PasswordInput";

const initialValues = { password: "", confirmPassword: "" };

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [values, setValues] = useState(initialValues);
  const { errors, setMultipleErrors, clearError, clearAllErrors } = useFormErrors();
  
  const [resetPassword, { isLoading: isSubmitting }] = useResetPasswordMutation();

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    clearError(field);
    clearError("general");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setMultipleErrors({ general: "Invalid or missing reset token." });
      return;
    }

    try {
      await resetPasswordSchema.validate(values, { abortEarly: false });
      clearAllErrors();
      
      await resetPassword({ ...values, token }).unwrap();
      router.push("/auth/login");
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((e: any) => {
          if (e.path) fieldErrors[e.path] = e.message;
        });
        setMultipleErrors(fieldErrors);
      } else {
        const errorMessage = err.data?.message || err.message || "Failed to reset password.";
        setMultipleErrors({ general: errorMessage });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-5 rounded-xl border border-border bg-card p-6"
    >
      <h1 className="text-center text-xl font-semibold text-foreground sm:text-2xl">
        Reset Password
      </h1>

      {errors.general && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
          {errors.general}
        </div>
      )}

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-foreground/80"
        >
          New Password
        </label>
        <PasswordInput
          id="password"
          value={values.password}
          onChange={(e) => handleChange("password", e.target.value)}
          error={errors.password}
          placeholder="••••••••"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-1.5 block text-sm font-medium text-foreground/80"
        >
          Confirm New Password
        </label>
        <PasswordInput
          id="confirmPassword"
          value={values.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          placeholder="••••••••"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground hover:opacity-90 disabled:opacity-60"
      >
        <FiLock size={16} />
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex w-full items-center justify-center p-6 text-muted">Loading form...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}