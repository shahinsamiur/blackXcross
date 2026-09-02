"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { FiSave, FiX } from "react-icons/fi";
import { Button } from "../../../utils/Button";
import { useFormErrors } from "../../../hooks/useFormErrors";
import { dossierSchema } from "../../../validations/dossier.schema";
import ProfileAvatar from "../../../components/blackxcross/ProfileAvatar";

const initialValues = {
  displayName: "Your Name",
  bio: "",
  avatarUrl: "/image/hero1.jpg",
};

export default function DossierEditPage() {
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
      await dossierSchema.validate(values, { abortEarly: false });
      clearAllErrors();
      router.push("/dossier");
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
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Edit Dossier
        </h1>
        <button
          type="button"
          onClick={() => router.push("/dossier")}
          aria-label="Cancel"
          className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 hover:bg-card hover:text-primary"
        >
          <FiX size={20} />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-2xl flex-col gap-6 rounded-xl border border-border bg-card p-5 sm:p-6"
      >
        <div className="flex items-center gap-4">
          <ProfileAvatar src={values.avatarUrl} alt="Preview" size={64} />
          <div className="flex-1">
            <label
              htmlFor="avatarUrl"
              className="mb-1.5 block text-sm font-medium text-foreground/80"
            >
              Avatar URL
            </label>
            <input
              id="avatarUrl"
              type="text"
              value={values.avatarUrl}
              onChange={(e) => handleChange("avatarUrl", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
              placeholder="/image/your-photo.jpg"
            />
            {errors.avatarUrl && (
              <p className="mt-1 text-xs text-primary">{errors.avatarUrl}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="displayName"
            className="mb-1.5 block text-sm font-medium text-foreground/80"
          >
            Display Name
          </label>
          <input
            id="displayName"
            type="text"
            value={values.displayName}
            onChange={(e) => handleChange("displayName", e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
          {errors.displayName && (
            <p className="mt-1 text-xs text-primary">{errors.displayName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="bio"
            className="mb-1.5 block text-sm font-medium text-foreground/80"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows={4}
            value={values.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
            placeholder="Tell the community about yourself..."
          />
          {errors.bio && (
            <p className="mt-1 text-xs text-primary">{errors.bio}</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            onClick={() => router.push("/dossier")}
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground/80 hover:border-primary/40 hover:text-primary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground hover:opacity-90 disabled:opacity-60"
          >
            <FiSave size={16} />
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
