"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import * as yup from "yup";
import { FiSave } from "react-icons/fi";
import { Button } from "../../../../../utils/Button";
import { useFormErrors } from "../../../../../hooks/useFormErrors";
import { caseSchema } from "../../../../../validations/case.schema";
import type { CaseStatus, CaseEvidenceItem } from "../../../../../_mock/blackxcross";
import { CaseImageUpload } from "../../../../../components/case/CaseImageUpload";
import { GalleryImageUpload } from "../../../../../components/case/GalleryImageUpload";
import { EvidenceManager } from "../../../../../components/case/EvidenceManager";
import { useGetCaseQuery, useUploadCaseImageMutation, useUpdateCaseMutation } from "../../../../../state/redux/api/cases";

type FormValues = {
  title: string;
  description: string;
  status: CaseStatus;
  imagePreviewUrl: string;
  imageFile: File | null;
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
  const { data: caseData, isLoading: isCaseLoading, isError: isCaseError } = useGetCaseQuery(params.id);
  
  const [values, setValues] = useState<FormValues>({
    title: "",
    description: "",
    status: "COLD CASE",
    imagePreviewUrl: "",
    imageFile: null,
    narrative: "",
    location: "",
    gallery: [],
    evidence: [],
  });

  const [newEvidenceLabel, setNewEvidenceLabel] = useState("");
  const [newEvidenceType, setNewEvidenceType] = useState<CaseEvidenceItem["type"]>("document");
  const [submitting, setSubmitting] = useState(false);
  const { errors, setMultipleErrors, clearError, clearAllErrors } = useFormErrors();

  const [uploadCaseImage] = useUploadCaseImageMutation();
  const [updateCase] = useUpdateCaseMutation();

  useEffect(() => {
    if (caseData) {
      setValues({
        title: caseData.title,
        description: caseData.description || "",
        status: caseData.investigationStatus === "OPEN" || caseData.investigationStatus === "SOLVED" ? "OPEN CASE" : "COLD CASE",
        imagePreviewUrl: caseData.imageUrl || "",
        imageFile: null,
        narrative: caseData.narrative || "",
        location: caseData.location || "",
        gallery: [],
        evidence: (caseData.files || []).map((f: any) => ({
          id: f.id,
          label: f.filename,
          type: f.mimeType.startsWith("image/") ? "image" : f.mimeType.startsWith("audio/") ? "audio" : "document",
        })),
      });
    }
  }, [caseData]);

  type EditableTextField = "title" | "description" | "status" | "narrative" | "location";

  const handleChange = (field: EditableTextField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const handleCaseImageSelect = (file: File) => {
    if (values.imagePreviewUrl?.startsWith("blob:")) URL.revokeObjectURL(values.imagePreviewUrl);
    setValues((prev) => ({ ...prev, imageFile: file, imagePreviewUrl: URL.createObjectURL(file) }));
    clearError("image");
  };

  const handleRemoveCaseImage = () => {
    if (values.imagePreviewUrl?.startsWith("blob:")) URL.revokeObjectURL(values.imagePreviewUrl);
    setValues((prev) => ({ ...prev, imageFile: null, imagePreviewUrl: caseData?.imageUrl || "" }));
  };

  const handleGalleryFilesSelected = (files: File[]) => {
    setValues((prev) => {
      const remainingSlots = MAX_GALLERY_IMAGES - prev.gallery.length;
      if (remainingSlots <= 0) return prev;
      const previewUrls = files.slice(0, remainingSlots).map((file) => URL.createObjectURL(file));
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
      evidence: [...prev.evidence, { id: `ev-${Date.now()}`, label: newEvidenceLabel.trim(), type: newEvidenceType }],
    }));
    setNewEvidenceLabel("");
    setNewEvidenceType("document");
  };

  const handleRemoveEvidence = (id: string) => {
    setValues((prev) => ({ ...prev, evidence: prev.evidence.filter((item) => item.id !== id) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    clearAllErrors();

    try {
      await caseSchema.validate(
        { title: values.title, description: values.description, status: values.status, image: values.imageFile || values.imagePreviewUrl },
        { abortEarly: false }
      );

      let finalImageUrl = values.imagePreviewUrl;
      if (values.imageFile) {
        const uploadResult = await uploadCaseImage(values.imageFile).unwrap();
        finalImageUrl = uploadResult.imageUrl;
      }

      await updateCase({
        id: params.id,
        data: {
          title: values.title,
          description: values.description,
          investigationStatus: values.status === "OPEN CASE" ? "OPEN" : "COLD",
          imageUrl: finalImageUrl,
          narrative: values.narrative,
          location: values.location,
        },
      }).unwrap();

      router.push(`/cases/${params.id}`);
    } catch (err: any) {
      if (err.name === "ValidationError") {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((e: yup.ValidationError) => {
          if (e.path) fieldErrors[e.path] = e.message;
        });
        setMultipleErrors(fieldErrors);
      } else {
        console.error("Submission error:", err);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (isCaseLoading) {
    return <div className="flex w-full items-center justify-center py-16 text-sm text-muted">Loading case details...</div>;
  }

  if (isCaseError || !caseData) {
    return (
      <div className="flex w-full flex-col items-center gap-3 px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-muted">Case not found. It may have been removed or the link is incorrect.</p>
        <button type="button" onClick={() => router.push("/my-dossier")} className="text-sm font-semibold text-primary hover:opacity-80">Back to Dossier</button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">Edit Case</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 rounded-xl border border-border bg-card p-5 sm:p-6">
        <CaseImageUpload value={values.imagePreviewUrl} onSelect={handleCaseImageSelect} onRemove={handleRemoveCaseImage} error={errors.image} />

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-foreground/80">Description</label>
          <textarea id="description" rows={4} value={values.description} onChange={(e) => handleChange("description", e.target.value)} className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none" />
          {errors.description && <p className="mt-1 text-xs text-primary">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="narrative" className="mb-1.5 block text-sm font-medium text-foreground/80">Case Narrative</label>
          <textarea id="narrative" rows={6} value={values.narrative} onChange={(e) => handleChange("narrative", e.target.value)} placeholder="Full-length write-up of the case for the dossier page..." className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none" />
        </div>

        <div>
          <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-foreground/80">Location</label>
          <input id="location" type="text" value={values.location} onChange={(e) => handleChange("location", e.target.value)} placeholder="e.g. Alpine Region, Switzerland" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none" />
        </div>

        <div>
          <label htmlFor="status" className="mb-1.5 block text-sm font-medium text-foreground/80">Status</label>
          <select id="status" value={values.status} onChange={(e) => handleChange("status", e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none">
            <option value="COLD CASE">Cold Case</option>
            <option value="OPEN CASE">Open Case</option>
          </select>
          {errors.status && <p className="mt-1 text-xs text-primary">{errors.status}</p>}
        </div>

        <GalleryImageUpload images={values.gallery} max={MAX_GALLERY_IMAGES} onFilesSelected={handleGalleryFilesSelected} onRemove={handleRemoveGalleryImage} />
        <EvidenceManager evidence={values.evidence} evidenceTypes={evidenceTypes} newLabel={newEvidenceLabel} newType={newEvidenceType} onLabelChange={setNewEvidenceLabel} onTypeChange={setNewEvidenceType} onAdd={handleAddEvidence} onRemove={handleRemoveEvidence} />

        <div className="flex justify-end gap-3 border-t border-border pt-6">
          <Button type="button" onClick={() => router.push(`/cases/${params.id}`)} className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground/80 hover:border-primary/40 hover:text-primary">Cancel</Button>
          <Button type="submit" disabled={submitting} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground hover:opacity-90 disabled:opacity-60">
            <FiSave size={16} />
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}