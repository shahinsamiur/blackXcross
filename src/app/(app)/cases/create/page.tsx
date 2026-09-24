"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { FiSave } from "react-icons/fi";
import { Button } from "../../../../utils/Button";
import { useFormErrors } from "../../../../hooks/useFormErrors";
import { caseSchema } from "../../../../validations/case.schema";
import type { CaseStatus, CaseEvidenceItem } from "../../../../_mock/blackxcross";
import { CaseImageUpload } from "../../../../components/case/CaseImageUpload";
import { GalleryImageUpload } from "../../../../components/case/GalleryImageUpload";
import { EvidenceManager } from "../../../../components/case/EvidenceManager";
import { useUploadCaseImageMutation, useCreateCaseMutation, useAddCaseFileMutation, useAddCaseGalleryImageMutation } from "../../../../state/redux/api/cases";

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

const initialValues: FormValues = {
  title: "",
  description: "",
  status: "COLD CASE",
  imagePreviewUrl: "",
  imageFile: null,
  narrative: "",
  location: "",
  gallery: [],
  evidence: [],
};

const MAX_GALLERY_IMAGES = 7;
const MAX_EVIDENCE_FILES = 7;

const detectEvidenceType = (file: File): CaseEvidenceItem["type"] => {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("audio/")) return "audio";
  return "document";
};

export default function CreateCasePage() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(initialValues);
  // FIX: Use a single state for gallery items to prevent stale closure bugs
  const [galleryItems, setGalleryItems] = useState<{ file: File; url: string }[]>([]);
  const [evidenceFiles, setEvidenceFiles] = useState<Record<string, File>>({});
  const [submitting, setSubmitting] = useState(false);
  const { errors, setMultipleErrors, clearError, clearAllErrors } = useFormErrors();

  const [uploadCaseImage] = useUploadCaseImageMutation();
  const [createCase] = useCreateCaseMutation();
  const [addCaseFile] = useAddCaseFileMutation();
  const [addCaseGalleryImage] = useAddCaseGalleryImageMutation();

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
    setValues((prev) => ({ ...prev, imageFile: null, imagePreviewUrl: "" }));
  };

  // FIX: Functional updates ensure we never read stale state
  const handleGalleryFilesSelected = (files: File[]) => {
    setGalleryItems((prev) => {
      const remainingSlots = MAX_GALLERY_IMAGES - prev.length;
      if (remainingSlots <= 0) return prev;
      
      const filesToAdd = files.slice(0, remainingSlots);
      const newItems = filesToAdd.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      
      setValues((prevValues) => ({
        ...prevValues,
        gallery: [...prevValues.gallery, ...newItems.map((item) => item.url)],
      }));
      
      return [...prev, ...newItems];
    });
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryItems((prev) => {
      const removed = prev[index];
      if (removed?.url?.startsWith("blob:")) {
        URL.revokeObjectURL(removed.url);
      }
      
      const newItems = prev.filter((_, i) => i !== index);
      
      setValues((prevValues) => ({
        ...prevValues,
        gallery: newItems.map((item) => item.url),
      }));
      
      return newItems;
    });
  };

  const handleEvidenceFilesSelected = (files: File[]) => {
    setValues((prev) => {
      const remainingSlots = MAX_EVIDENCE_FILES - prev.evidence.length;
      if (remainingSlots <= 0) return prev;

      const filesToAdd = files.slice(0, remainingSlots);
      const newItems: CaseEvidenceItem[] = [];
      const newFilesMap: Record<string, File> = {};

      filesToAdd.forEach((file) => {
        const id = `ev-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        newItems.push({ id, label: file.name, type: detectEvidenceType(file) });
        newFilesMap[id] = file;
      });

      setEvidenceFiles((prevFiles) => ({ ...prevFiles, ...newFilesMap }));
      return { ...prev, evidence: [...prev.evidence, ...newItems] };
    });
  };

  const handleRemoveEvidence = (id: string) => {
    setValues((prev) => ({ ...prev, evidence: prev.evidence.filter((item) => item.id !== id) }));
    setEvidenceFiles((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
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

      const created = await createCase({
        title: values.title,
        description: values.description,
        category: "OTHER",
        investigationStatus: values.status === "OPEN CASE" ? "OPEN" : "COLD",
        imageUrl: finalImageUrl,
        narrative: values.narrative,
        location: values.location,
      }).unwrap();

      // FIX: Map directly from the reliable galleryItems state
      const galleryUploads = galleryItems.map((item) =>
        addCaseGalleryImage({ caseId: created.id, file: item.file }).unwrap()
      );
      
      const evidenceUploads = values.evidence
        .filter((item) => evidenceFiles[item.id])
        .map((item) => addCaseFile({ caseId: created.id, file: evidenceFiles[item.id] }).unwrap());
        
      const allUploads = [...galleryUploads, ...evidenceUploads];
      if (allUploads.length) {
        const results = await Promise.allSettled(allUploads);
        const failed = results.filter((r) => r.status === "rejected").length;
        if (failed > 0) {
          alert(`Case created successfully, but ${failed} file(s) failed to upload to the server.`);
        }
      }

      router.push("/my-dossier");
    } catch (err: any) {
      if (err.name === "ValidationError") {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((e: yup.ValidationError) => {
          if (e.path) fieldErrors[e.path] = e.message;
        });
        setMultipleErrors(fieldErrors);
      } else {
        console.error("Submission error:", err);
        alert("Failed to create case. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">Submit a Case</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 rounded-xl border border-border bg-card p-5 sm:p-6">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-foreground/80">Case Title</label>
          <input id="title" type="text" value={values.title} onChange={(e) => handleChange("title", e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none" placeholder="The Alpine Anomaly Team" />
          {errors.title && <p className="mt-1 text-xs text-primary">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-foreground/80">Description</label>
          <textarea id="description" rows={4} value={values.description} onChange={(e) => handleChange("description", e.target.value)} className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none" placeholder="Summarize the case for other investigators..." />
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

        <CaseImageUpload value={values.imagePreviewUrl} onSelect={handleCaseImageSelect} onRemove={handleRemoveCaseImage} error={errors.image} />
        <GalleryImageUpload images={values.gallery} max={MAX_GALLERY_IMAGES} onFilesSelected={handleGalleryFilesSelected} onRemove={handleRemoveGalleryImage} />
        <EvidenceManager evidence={values.evidence} max={MAX_EVIDENCE_FILES} onFilesSelected={handleEvidenceFilesSelected} onRemove={handleRemoveEvidence} />

        <div className="flex justify-end gap-3">
          <Button type="button" onClick={() => router.push("/my-dossier")} className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground/80 hover:border-primary/40 hover:text-primary">Cancel</Button>
          <Button type="submit" disabled={submitting} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground hover:opacity-90 disabled:opacity-60">
            <FiSave size={16} />
            {submitting ? "Submitting..." : "Submit Case"}
          </Button>
        </div>
      </form>
    </div>
  );
}