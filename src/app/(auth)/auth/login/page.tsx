"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { FiLogIn } from "react-icons/fi";
import { Button } from "../../../../utils/Button";
import { useFormErrors } from "../../../../hooks/useFormErrors";
import { loginSchema } from "../../../../validations/login.schema";

const initialValues = { email: "", password: "" };

export default function LoginPage() {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const { errors, setMultipleErrors, clearError, clearAllErrors } =
    useFormErrors();

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await loginSchema.validate(values, { abortEarly: false });
      clearAllErrors();
      // Placeholder: no auth API exists yet.
      router.push("/");
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
      <h1 className="text-center text-xl font-semibold text-foreground sm:text-2xl">
        Log In
      </h1>

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
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-primary">{errors.email}</p>
        )}
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-medium text-foreground/80"
          >
            Password
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-xs font-medium text-primary hover:opacity-80"
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          value={values.password}
          onChange={(e) => handleChange("password", e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-primary">{errors.password}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground hover:opacity-90 disabled:opacity-60"
      >
        <FiLogIn size={16} />
        {submitting ? "Logging in..." : "Log In"}
      </Button>

      <p className="text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-primary hover:opacity-80"
        >
          Register
        </Link>
      </p>
    </form>
  );
}
