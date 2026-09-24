"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { FiUserPlus, FiUser, FiMail, FiAlertCircle } from "react-icons/fi";
import { Button } from "../../../../utils/Button";
import { useFormErrors } from "../../../../hooks/useFormErrors";
import { registerSchema } from "../../../../validations/register.schema";
import { useRegisterMutation } from "../../../../state/redux/api/auth";
import PasswordInput from "../../../../components/ui/PasswordInput";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const { errors, setMultipleErrors, clearError, clearAllErrors } = useFormErrors();
  
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    clearError(field);
    clearError("general");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerSchema.validate(values, { abortEarly: false });
      clearAllErrors();
      
      await register(values).unwrap();
      // Fix: Redirect to login page after successful signup
      router.push("/auth/login");
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((e: any) => {
          if (e.path) fieldErrors[e.path] = e.message;
        });
        setMultipleErrors(fieldErrors);
      } else {
        const errorMessage = err.data?.message || err.message || "Registration failed.";
        if (errorMessage.toLowerCase().includes("email")) {
          setMultipleErrors({ email: errorMessage });
        } else {
          setMultipleErrors({ general: errorMessage });
        }
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
            <FiUserPlus size={20} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Create your account
          </h1>
          <p className="text-sm text-muted">
            Sign up to get started
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
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-foreground/80"
            >
              Name
            </label>
            <div className="relative">
              <FiUser
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                id="name"
                type="text"
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {errors.name && (
              <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>
            )}
          </div>

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
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-foreground/80"
            >
              Password
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
              Confirm Password
            </label>
            <PasswordInput
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
              placeholder="••••••••"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isRegistering}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <FiUserPlus size={16} />
          {isRegistering ? "Creating account..." : "Create Account"}
        </Button>

        <p className="text-center text-sm text-muted">
          Already have an account?
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:opacity-80"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}