"use client";

import { useState } from "react";
import { ValidationError } from "yup";
import { groupSchema } from "../../validations/group.schema";
import { groupCategories, type Group } from "../../_mock/groups";

export default function SettingsTab({ group }: { group: Group }) {
  const [values, setValues] = useState({
    name: group.name,
    category: group.category,
    description: group.description,
    visibility: group.visibility,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await groupSchema.validate(values, { abortEarly: false });
      setErrors({});
      setSaved(true);
    } catch (err) {
      if (err instanceof ValidationError) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path && !fieldErrors[e.path]) fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${group.name}"? This cannot be undone.`)) {
      // mock only — no backend call
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
      <form
        onSubmit={handleSave}
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
          />
          {errors.name && <p className="text-xs text-danger">{errors.name}</p>}
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
          >
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

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-foreground hover:opacity-90"
          >
            Save Changes
          </button>
          {saved && (
            <span className="text-xs text-success">Changes saved.</span>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-3 rounded-lg border border-danger/40 bg-danger/5 p-5">
        <h2 className="text-sm font-semibold text-danger">Danger Zone</h2>
        <p className="text-xs text-muted">
          Deleting this group is permanent and removes all channels and
          membership records.
        </p>
        <button
          type="button"
          onClick={handleDelete}
          className="self-start rounded-lg border border-danger/40 px-4 py-2 text-sm font-medium text-danger hover:bg-danger/10"
        >
          Delete Group
        </button>
      </div>
    </div>
  );
}
