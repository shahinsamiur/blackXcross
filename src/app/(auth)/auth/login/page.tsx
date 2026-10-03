"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { FiLogIn, FiMail, FiAlertCircle } from "react-icons/fi";
import { Button } from "../../../../utils/Button";
import { useFormErrors } from "../../../../hooks/useFormErrors";
import { loginSchema } from "../../../../validations/login.schema";
import { useLoginMutation } from "../../../../state/redux/api/auth";
import { setCredentials } from "../../../../state/redux/slices/authSlice";
import PasswordInput from "../../../../components/ui/PasswordInput";
const initialValues = { email: "", password: "" };
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialValues);
  const { errors, setMultipleErrors, clearError, clearAllErrors } = useFormErrors();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    clearError(field);
    clearError("general");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginSchema.validate(values, { abortEarly: false });
      clearAllErrors();
      const result = await login(values).unwrap();
      if (result.refreshToken) {
        document.cookie = `refreshToken=${result.refreshToken}; path=/; max-age=${60 * 60 * 24 * 30}`;
      }
      dispatch(setCredentials({ user: result.user }));
      const redirectPath = searchParams.get("redirect") || "/";
      router.push(redirectPath);
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((e: any) => {
          if (e.path) fieldErrors[e.path] = e.message;
        });
        setMultipleErrors(fieldErrors);
      } else {
        const errorMessage = err.data?.message || err.message || "Invalid email or password.";
        setMultipleErrors({ general: errorMessage });
      }
    }
  };

  return (
    <div className="flex w-full items-center justify-center px-4 py-10 sm:py-16">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiLogIn size={20} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="text-sm text-muted">
            Log in to continue to your account
          </p>
        </div>

        {errors.general && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
            <FiAlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{errors.general}</span>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-foreground/80"
            >
              Email
            </label>
            <div className="relative">
              <FiMail
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
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
            <PasswordInput
              id="password"
              value={values.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
              placeholder="••••••••"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoggingIn}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <FiLogIn size={16} />
          {isLoggingIn ? "Logging in..." : "Log In"}
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
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex w-full items-center justify-center p-6 text-muted">Loading form...</div>}>
      <LoginContent />
    </Suspense>
  );
}