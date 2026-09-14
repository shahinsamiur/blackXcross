"use client";

import { useState } from "react";
import Link from "next/link";
import * as yup from "yup";
import { FiMail, FiCheckCircle } from "react-icons/fi";
import { Button } from "../../../../utils/Button";
import { useFormErrors } from "../../../../hooks/useFormErrors";
import { forgotPasswordSchema } from "../../../../validations/forgotPassword.schema";
import { useForgotPasswordMutation } from "../../../../state/redux/api/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { errors, setMultipleErrors, clearError, clearAllErrors } = useFormErrors();
  
  const [forgotPassword, { isLoading: isSubmitting }] = useForgotPasswordMutation();

  const handleChange = (value: string) => {
    setEmail(value);
    clearError("email");
    clearError("general");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPasswordSchema.validate({ email }, { abortEarly: false });
      clearAllErrors();
      
      await forgotPassword({ email }).unwrap();
      setSent(true);
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((e: any) => {
          if (e.path) fieldErrors[e.path] = e.message;
        });
        setMultipleErrors(fieldErrors);
      } else {
        const errorMessage = err.data?.message || err.message || "Failed to send reset link.";
        setMultipleErrors({ email: errorMessage });
      }
    }
  };

  if (sent) {
    return (
      <div className="flex w-full flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 text-center">
        <FiCheckCircle size={28} className="text-success" />
        <div>
          <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
            Check Your Email
          </h1>
          <p className="mt-1 text-sm text-muted">
            If an account exists for {email}, a reset link is on its way.
          </p>
        </div>
        <Link
          href="/auth/login"
          className="text-sm font-medium text-primary hover:opacity-80"
        >
          Back to Log In
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-5 rounded-xl border border-border bg-card p-6"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Forgot Password
        </h1>
        <p className="text-sm text-muted">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      {errors.general && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
          {errors.general}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-foreground/80"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-destructive">{errors.email}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground hover:opacity-90 disabled:opacity-60"
      >
        <FiMail size={16} />
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </Button>

      <p className="text-center text-sm text-muted">
        <Link
          href="/auth/login"
          className="font-medium text-primary hover:opacity-80"
        >
          Back to Log In
        </Link>
      </p>
    </form>
  );
}