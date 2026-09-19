"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { FiLogIn } from "react-icons/fi";
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
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-5 rounded-xl border border-border bg-card p-6"
    >
      <h1 className="text-center text-xl font-semibold text-foreground sm:text-2xl">
        Log In
      </h1>

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
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-destructive">{errors.email}</p>
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

      <Button
        type="submit"
        disabled={isLoggingIn}
        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground hover:opacity-90 disabled:opacity-60"
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
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex w-full items-center justify-center p-6 text-muted">Loading form...</div>}>
      <LoginContent />
    </Suspense>
  );
}