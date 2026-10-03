"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { FiCheckCircle } from "react-icons/fi";
import { Button } from "../../../../utils/Button";
import { useFormErrors } from "../../../../hooks/useFormErrors";
import { verifyEmailSchema } from "../../../../validations/verifyEmail.schema";
import { useVerifyEmailMutation } from "../../../../state/redux/api/auth";
export default function VerifyEmailPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const { errors, setMultipleErrors, clearError, clearAllErrors } = useFormErrors();
  const [verifyEmail, { isLoading: isSubmitting }] = useVerifyEmailMutation();
  const handleChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    setCode(numericValue);
    clearError("code");
    clearError("general");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyEmailSchema.validate({ code }, { abortEarly: false });
      clearAllErrors();
      await verifyEmail({ code }).unwrap();
      router.push("/auth/login");
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((e: any) => {
          if (e.path) fieldErrors[e.path] = e.message;
        });
        setMultipleErrors(fieldErrors);
      } else {
        const errorMessage = err.data?.message || err.message || "Invalid verification code.";
        setMultipleErrors({ code: errorMessage });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-5 rounded-xl border border-border bg-card p-6"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Verify Your Email
        </h1>
        <p className="text-sm text-muted">
          Enter the 6-digit code we sent to your inbox.
        </p>
      </div>
      {errors.general && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
          {errors.general}
        </div>
      )}
      <div>
        <label
          htmlFor="code"
          className="mb-1.5 block text-sm font-medium text-foreground/80"
        >
          Verification Code
        </label>
        <input
          id="code"
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={code}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-center text-lg tracking-[0.4em] text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          placeholder="000000"
        />
        {errors.code && (
          <p className="mt-1 text-xs text-destructive">{errors.code}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground hover:opacity-90 disabled:opacity-60"
      >
        <FiCheckCircle size={16} />
        {isSubmitting ? "Verifying..." : "Verify Email"}
      </Button>
      <p className="text-center text-sm text-muted">
        Didn&apos;t get a code?
        <button
          type="button"
          className="font-medium text-primary hover:opacity-80"
        >
          Resend
        </button>
      </p>
    </form>
  );
}