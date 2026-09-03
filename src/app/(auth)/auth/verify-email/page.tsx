"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { FiCheckCircle } from "react-icons/fi";
import { Button } from "../../../../utils/Button";
import { useFormErrors } from "../../../../hooks/useFormErrors";
import { verifyEmailSchema } from "../../../../validations/verifyEmail.schema";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { errors, setMultipleErrors, clearError, clearAllErrors } =
    useFormErrors();

  const handleChange = (value: string) => {
    setCode(value);
    clearError("code");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await verifyEmailSchema.validate({ code }, { abortEarly: false });
      clearAllErrors();
      router.push("/auth/login");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) fieldErrors[e.path] = e.message;
        });
        setMultipleErrors(fieldErrors);
      }
    } finally {
      setSubmitting(false);
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
          <p className="mt-1 text-xs text-primary">{errors.code}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground hover:opacity-90 disabled:opacity-60"
      >
        <FiCheckCircle size={16} />
        {submitting ? "Verifying..." : "Verify Email"}
      </Button>

      <p className="text-center text-sm text-muted">
        Didn&apos;t get a code?{" "}
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
