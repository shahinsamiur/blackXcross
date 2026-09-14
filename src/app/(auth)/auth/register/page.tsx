"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { FiUserPlus } from "react-icons/fi";
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
      router.push("/auth/verify-email");
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
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-5 rounded-xl border border-border bg-card p-6"
    >
      <h1 className="text-center text-xl font-semibold text-foreground sm:text-2xl">
        Create Account
      </h1>

      {errors.general && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
          {errors.general}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-foreground/80"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-destructive">{errors.name}</p>
        )}
      </div>

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

      <Button
        type="submit"
        disabled={isRegistering}
        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground hover:opacity-90 disabled:opacity-60"
      >
        <FiUserPlus size={16} />
        {isRegistering ? "Creating account..." : "Create Account"}
      </Button>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary hover:opacity-80"
        >
          Log In
        </Link>
      </p>
    </form>
  );
}