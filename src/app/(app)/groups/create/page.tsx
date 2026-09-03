"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ValidationError } from "yup";
import { groupSchema } from "../../../../validations/group.schema";
import { slugify } from "../../../../_mock/blackxcross";
import { groupCategories } from "../../../../_mock/groups";

export default function CreateGroupPage() {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    category: "",
    description: "",
    visibility: "public" as "public" | "private",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await groupSchema.validate(values, { abortEarly: false });
      setErrors({});
      router.push(`/groups/${slugify(values.name)}`);
    } catch (err) {
      if (err instanceof ValidationError) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path && !fieldErrors[e.path]) fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <div>
        <h1 className="font-display text-2xl text-foreground/90 sm:text-3xl">
          Start a New Group
        </h1>
        <p className="mt-1 text-sm text-muted">
          Create a space to collaborate on an investigation.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-5 rounded-lg border border-border bg-card p-5 sm:p-6"
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-sm font-medium text-foreground/80"
          >
            Group Name
          </label>
          <input
            id="name"
            type="text"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-danger">
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="category"
            className="text-sm font-medium text-foreground/80"
          >
            Category
          </label>
          <select
            id="category"
            value={values.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
            aria-invalid={Boolean(errors.category)}
          >
            <option value="">Select a category</option>
            {groupCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs text-danger">{errors.category}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="description"
            className="text-sm font-medium text-foreground/80"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={values.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
            aria-invalid={Boolean(errors.description)}
          />
          {errors.description && (
            <p className="text-xs text-danger">{errors.description}</p>
          )}
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-foreground/80">
            Visibility
          </legend>
          <div className="flex gap-4">
            {(["public", "private"] as const).map((v) => (
              <label
                key={v}
                className="flex items-center gap-2 text-sm text-foreground/80"
              >
                <input
                  type="radio"
                  name="visibility"
                  value={v}
                  checked={values.visibility === v}
                  onChange={() => handleChange("visibility", v)}
                  className="accent-primary"
                />
                <span className="capitalize">{v}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-foreground hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create Group"}
        </button>
      </form>
    </div>
  );
}
