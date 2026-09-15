"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { FiSave, FiAlertTriangle } from "react-icons/fi";
import { Button } from "../../../../utils/Button";
import { useFormErrors } from "../../../../hooks/useFormErrors";
import { dossierSchema } from "../../../../validations/dossier.schema";
import { useGetUserQuery, useUploadAvatarMutation, useUpdateUserMutation } from "../../../../state/redux/api/users";

const initialValues = {
  displayName: "",
  bio: "",
  title: "",
  location: "",
  website: "",
};

const DEFAULT_AVATAR = "/image/hero1.jpg";

export default function DossierEditPage() {
  const router = useRouter();
  const userId = useSelector((state: any) => state.auth.user?.id);
  const userEmail = useSelector((state: any) => state.auth.user?.email) || "investigator@example.com";

  const { data: userData, isLoading: isUserLoading } = useGetUserQuery(userId as string, { skip: !userId });
  const [uploadAvatar] = useUploadAvatarMutation();
  const [updateUser] = useUpdateUserMutation();

  const [values, setValues] = useState(initialValues);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(DEFAULT_AVATAR);
  const [submitting, setSubmitting] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const { errors, setMultipleErrors, clearError, clearAllErrors } = useFormErrors();

  useEffect(() => {
    if (userData) {
      setValues({
        displayName: userData.name || "",
        bio: userData.bio || "",
        title: userData.title || "",
        location: userData.location || "",
        website: userData.website || "",
      });
      setAvatarPreview(userData.avatar || DEFAULT_AVATAR);
    }
  }, [userData]);

  useEffect(() => {
    return () => {
      if (avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setAvatarFile(file);
    clearError("avatarFile");
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setSubmitting(true);
    clearAllErrors();

    try {
      await dossierSchema.validate({ ...values, avatarFile }, { abortEarly: false });

      if (avatarFile) {
        await uploadAvatar({ id: userId, file: avatarFile }).unwrap();
      }

      await updateUser({
        id: userId,
        data: {
          name: values.displayName,
          bio: values.bio,
          title: values.title,
          location: values.location,
          website: values.website,
        },
      }).unwrap();

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
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (isUserLoading) {
    return <div className="flex w-full items-center justify-center py-16 text-sm text-muted">Loading dossier...</div>;
  }

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">Edit Dossier</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-primary/30">
            <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover grayscale contrast-125" />
            <span aria-hidden className="absolute inset-0 bg-primary mix-blend-multiply opacity-70" />
            <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle,transparent_35%,var(--background)_115%)] opacity-70" />
          </span>
          <div className="flex-1">
            <label htmlFor="avatarFile" className="mb-1.5 block text-sm font-medium text-foreground/80">Profile Photo</label>
            <input
              id="avatarFile"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleAvatarChange}
              className="block w-full text-sm text-foreground/80 file:mr-4 file:rounded-lg file:border file:border-border file:bg-background file:px-3 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:border-primary/50"
            />
            {errors.avatarFile && <p className="mt-1 text-xs text-primary">{errors.avatarFile}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="displayName" className="mb-1.5 block text-sm font-medium text-foreground/80">Display Name</label>
          <input id="displayName" type="text" value={values.displayName} onChange={(e) => handleChange("displayName", e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none" />
          {errors.displayName && <p className="mt-1 text-xs text-primary">{errors.displayName}</p>}
        </div>

        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-foreground/80">Investigator Title</label>
          <input id="title" type="text" value={values.title} onChange={(e) => handleChange("title", e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none" placeholder="Lead Researcher, Amateur Sleuth, etc." />
          {errors.title && <p className="mt-1 text-xs text-primary">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="bio" className="mb-1.5 block text-sm font-medium text-foreground/80">Bio</label>
          <textarea id="bio" rows={4} value={values.bio} onChange={(e) => handleChange("bio", e.target.value)} className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none" placeholder="Tell the community about yourself..." />
          {errors.bio && <p className="mt-1 text-xs text-primary">{errors.bio}</p>}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-foreground/80">Location</label>
            <input id="location" type="text" value={values.location} onChange={(e) => handleChange("location", e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none" placeholder="City, Country" />
            {errors.location && <p className="mt-1 text-xs text-primary">{errors.location}</p>}
          </div>
          <div>
            <label htmlFor="website" className="mb-1.5 block text-sm font-medium text-foreground/80">Website</label>
            <input id="website" type="text" value={values.website} onChange={(e) => handleChange("website", e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none" placeholder="https://your-site.com" />
            {errors.website && <p className="mt-1 text-xs text-primary">{errors.website}</p>}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground/80">Email</label>
          <input type="text" value={userEmail} disabled readOnly className="w-full cursor-not-allowed rounded-lg border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground/60" />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" onClick={() => router.push("/my-dossier")} className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground/80 hover:border-primary/40 hover:text-primary">Cancel</Button>
          <Button type="submit" disabled={submitting} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground hover:opacity-90 disabled:opacity-60">
            <FiSave size={16} />
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>

      <div className="flex w-full flex-col gap-4 rounded-xl border border-primary/40 bg-card p-5 sm:p-6">
        <div className="flex items-center gap-2 text-primary">
          <FiAlertTriangle size={18} />
          <h2 className="text-base font-semibold">Danger Zone</h2>
        </div>
        <p className="text-sm text-foreground/70">Deleting your account permanently removes your dossier, submitted cases, and community activity. This action cannot be undone.</p>
        {!confirmingDelete ? (
          <Button type="button" onClick={() => setConfirmingDelete(true)} className="w-fit rounded-lg border border-primary px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary hover:text-foreground">Delete Account</Button>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-medium text-foreground">Are you sure?</p>
            <Button type="button" onClick={() => router.push("/auth/login")} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground hover:opacity-90">Yes, delete my account</Button>
            <Button type="button" onClick={() => setConfirmingDelete(false)} className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground/80 hover:border-primary/40 hover:text-primary">Cancel</Button>
          </div>
        )}
      </div>
    </div>
  );
}