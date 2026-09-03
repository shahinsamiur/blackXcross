"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import * as yup from "yup";
import { FiSave, FiX } from "react-icons/fi";
import { Button } from "../../../../../utils/Button";
import { useFormErrors } from "../../../../../hooks/useFormErrors";
import { caseSchema } from "../../../../../validations/case.schema";
import { caseFiles, type CaseStatus } from "../../../../../_mock/blackxcross";

type FormValues = {
  title: string;
  description: string;
  status: CaseStatus;
  image: string;
};

export default function EditCasePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const existingCase = caseFiles.find((c) => c.id === params.id);

  const [values, setValues] = useState<FormValues>({
    title: existingCase?.title ?? "",
    description: existingCase?.description ?? "",
    status: existingCase?.status ?? "COLD CASE",
    image: existingCase?.image ?? "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { errors, setMultipleErrors, clearError, clearAllErrors } =
    useFormErrors();

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await caseSchema.validate(values, { abortEarly: false });
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

  if (!existingCase) {
    return (
      <div className="flex w-full flex-col items-center gap-3 px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-muted">
          Case not found. It may have been removed or the link is incorrect.
        </p>
        <button
          type="button"
          onClick={() => router.push("/dossier")}
          className="text-sm font-semibold text-primary hover:opacity-80"
        >
          Back to Dossier
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Edit Case
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
        <div>
          <label
            htmlFor="title"
            className="mb-1.5 block text-sm font-medium text-foreground/80"
          >
            Case Title
          </label>
          <input
            id="title"
            type="text"
            value={values.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-primary">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1.5 block text-sm font-medium text-foreground/80"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={values.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-primary">{errors.description}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-1.5 block text-sm font-medium text-foreground/80"
          >
            Status
          </label>
          <select
            id="status"
            value={values.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
          >
            <option value="COLD CASE">Cold Case</option>
            <option value="OPEN CASE">Open Case</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-xs text-primary">{errors.status}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="image"
            className="mb-1.5 block text-sm font-medium text-foreground/80"
          >
            Case Image URL
          </label>
          <input
            id="image"
            type="text"
            value={values.image}
            onChange={(e) => handleChange("image", e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
          {errors.image && (
            <p className="mt-1 text-xs text-primary">{errors.image}</p>
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
