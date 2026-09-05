"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import * as yup from "yup";
import { FiSave } from "react-icons/fi";
import { Button } from "../../../../../utils/Button";
import { useFormErrors } from "../../../../../hooks/useFormErrors";
import { caseSchema } from "../../../../../validations/case.schema";
import {
  caseFiles,
  type CaseStatus,
  type CaseEvidenceItem,
} from "../../../../../_mock/blackxcross";
import { CaseImageUpload } from "../../../../../components/case/CaseImageUpload";
import { GalleryImageUpload } from "../../../../../components/case/GalleryImageUpload";
import { EvidenceManager } from "../../../../../components/case/EvidenceManager";

type FormValues = {
  title: string;
  description: string;
  status: CaseStatus;
  image: string;
  narrative: string;
  location: string;
  gallery: string[];
  evidence: CaseEvidenceItem[];
};

const evidenceTypes: CaseEvidenceItem["type"][] = ["image", "document", "audio"];
const MAX_GALLERY_IMAGES = 7;

export default function EditCasePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const existingCase = caseFiles.find((c) => c.id === params.id);

  const [values, setValues] = useState<FormValues>({
    title: existingCase?.title ?? "",
    description: existingCase?.description ?? "",
    status: existingCase?.status ?? "COLD CASE",
    image: existingCase?.image ?? "",
    narrative: existingCase?.narrative ?? "",
    location: existingCase?.location ?? "",
    gallery: existingCase?.gallery ?? [],
    evidence: existingCase?.evidence ?? [],
  });

  const [newEvidenceLabel, setNewEvidenceLabel] = useState("");
  const [newEvidenceType, setNewEvidenceType] =
    useState<CaseEvidenceItem["type"]>("document");
  const [submitting, setSubmitting] = useState(false);
  const { errors, setMultipleErrors, clearError, clearAllErrors } =
    useFormErrors();

  type EditableTextField =
    | "title"
    | "description"
    | "status"
    | "image"
    | "narrative"
    | "location";

  const handleChange = (field: EditableTextField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const handleCaseImageSelect = (file: File) => {
    if (values.image?.startsWith("blob:")) URL.revokeObjectURL(values.image);
    setValues((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    clearError("image");
  };

  const handleRemoveCaseImage = () => {
    if (values.image?.startsWith("blob:")) URL.revokeObjectURL(values.image);
    setValues((prev) => ({ ...prev, image: "" }));
  };

  const handleGalleryFilesSelected = (files: File[]) => {
    setValues((prev) => {
      const remainingSlots = MAX_GALLERY_IMAGES - prev.gallery.length;
      if (remainingSlots <= 0) return prev;
      const previewUrls = files
        .slice(0, remainingSlots)
        .map((file) => URL.createObjectURL(file));
      return { ...prev, gallery: [...prev.gallery, ...previewUrls] };
    });
  };

  const handleRemoveGalleryImage = (index: number) => {
    setValues((prev) => {
      const removed = prev.gallery[index];
      if (removed?.startsWith("blob:")) URL.revokeObjectURL(removed);
      return { ...prev, gallery: prev.gallery.filter((_, i) => i !== index) };
    });
  };

  const handleAddEvidence = () => {
    if (!newEvidenceLabel.trim()) return;
    setValues((prev) => ({
      ...prev,
      evidence: [
        ...prev.evidence,
        { id: `ev-${Date.now()}`, label: newEvidenceLabel.trim(), type: newEvidenceType },
      ],
    }));
    setNewEvidenceLabel("");
    setNewEvidenceType("document");
  };

  const handleRemoveEvidence = (id: string) => {
    setValues((prev) => ({
      ...prev,
      evidence: prev.evidence.filter((item) => item.id !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await caseSchema.validate(
        {
          title: values.title,
          description: values.description,
          status: values.status,
          image: values.image,
        },
        { abortEarly: false },
      );
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
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">Edit Case</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-6 rounded-xl border border-border bg-card p-5 sm:p-6"
      >
        <CaseImageUpload
          value={values.image}
          onSelect={handleCaseImageSelect}
          onRemove={handleRemoveCaseImage}
          error={errors.image}
        />

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-foreground/80">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={values.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
          {errors.description && <p className="mt-1 text-xs text-primary">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="narrative" className="mb-1.5 block text-sm font-medium text-foreground/80">
            Case Narrative
          </label>
          <textarea
            id="narrative"
            rows={6}
            value={values.narrative}
            onChange={(e) => handleChange("narrative", e.target.value)}
            placeholder="Full-length write-up of the case for the dossier page..."
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-foreground/80">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={values.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="e.g. Alpine Region, Switzerland"
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="status" className="mb-1.5 block text-sm font-medium text-foreground/80">
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
          {errors.status && <p className="mt-1 text-xs text-primary">{errors.status}</p>}
        </div>

        <GalleryImageUpload
          images={values.gallery}
          max={MAX_GALLERY_IMAGES}
          onFilesSelected={handleGalleryFilesSelected}
          onRemove={handleRemoveGalleryImage}
        />

        <EvidenceManager
          evidence={values.evidence}
          evidenceTypes={evidenceTypes}
          newLabel={newEvidenceLabel}
          newType={newEvidenceType}
          onLabelChange={setNewEvidenceLabel}
          onTypeChange={setNewEvidenceType}
          onAdd={handleAddEvidence}
          onRemove={handleRemoveEvidence}
        />

        <div className="flex justify-end gap-3 border-t border-border pt-6">
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