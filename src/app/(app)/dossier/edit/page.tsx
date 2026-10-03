"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { FiSave, FiAlertTriangle, FiX } from "react-icons/fi";
import { Button } from "../../../../utils/Button";
import { useFormErrors } from "../../../../hooks/useFormErrors";
import { dossierSchema } from "../../../../validations/dossier.schema";
import type { RootState } from "../../../../state/redux/store";
import { Skeleton, SkeletonCircle } from "../../../../components/ui/Skeleton";
import {
  useGetMeQuery,
  useUploadAvatarMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../../../state/redux/api/users";
const DEFAULT_AVATAR = "/image/hero1.jpg";
export default function DossierEditPage() {
  const router = useRouter();
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useGetMeQuery();
  const userId = userData?.id;
  const userEmail =
    useSelector((state: RootState) => (state as any).auth?.user?.email) || "";
  const [uploadAvatar] = useUploadAvatarMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [values, setValues] = useState({
    displayName: "",
    bio: "",
    title: "",
    location: "",
    website: "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(DEFAULT_AVATAR);
  const [submitting, setSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { errors, setMultipleErrors, clearError, clearAllErrors } =
    useFormErrors();
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (userData && !hasInitialized.current) {
      setValues({
        displayName: userData.name || "",
        bio: userData.bio || "",
        title: userData.title || "",
        location: userData.location || "",
        website: userData.website || "",
      });
      setAvatarPreview(userData.avatar || DEFAULT_AVATAR);
      hasInitialized.current = true;
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
    if (!userId) {
      alert("You must be logged in to save changes.");
      return;
    }
    setSubmitting(true);
    clearAllErrors();
    try {
      const validatedData = await dossierSchema.validate(
        { ...values, avatarFile },
        { abortEarly: false },
      );
      if (avatarFile) {
        await uploadAvatar({
          id: userId,
          file: avatarFile,
        }).unwrap();
      }
      await updateUser({
        id: userId,
        data: {
          name: validatedData.displayName,
          bio: validatedData.bio || undefined,
          title: validatedData.title || undefined,
          location: validatedData.location || undefined,
          website: validatedData.website || undefined,
        },
      }).unwrap();
      router.push("/my-dossier");
    } catch (err: unknown) {
      const error = err as {
        name?: string;
        inner?: yup.ValidationError[];
        data?: { message?: string };
        message?: string;
      };
      if (error.name === "ValidationError" && error.inner) {
        const fieldErrors: Record<string, string> = {};
        error.inner.forEach((e: yup.ValidationError) => {
          if (e.path) {
            fieldErrors[e.path] = e.message;
          }
        });
        setMultipleErrors(fieldErrors);
      } else {
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "Failed to save profile. Please check your inputs and try again.";
        alert(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };
  const handleDeleteAccount = async () => {
    if (!userId) return;
    try {
      await deleteUser(userId).unwrap();
      router.push("/auth/login");
    } catch (err: unknown) {
      const error = err as { message?: string; data?: { message?: string } };
      alert(
        error?.data?.message || error?.message || "Failed to delete account.",
      );
    }
  };
  if (isUserLoading) {
    return (
      <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
        <Skeleton className="h-7 w-40" />
        <div className="flex w-full flex-col gap-6 rounded-xl border border-border bg-card p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <SkeletonCircle className="h-16 w-16 shrink-0" />
            <div className="flex-1">
              <Skeleton className="mb-2 h-4 w-28" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
          <div>
            <Skeleton className="mb-1.5 h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="mb-1.5 h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="mb-1.5 h-4 w-16" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Skeleton className="mb-1.5 h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="mb-1.5 h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Edit Dossier
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-6 rounded-xl border border-border bg-card p-5 sm:p-6"
      >
        <div className="flex items-center gap-4">
          <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-primary/30">
            <img
              src={avatarPreview}
              alt="Avatar preview"
              className="h-full w-full object-cover grayscale contrast-125"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-primary mix-blend-multiply opacity-70"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle,transparent_35%,var(--background)_115%)] opacity-70"
            />
          </span>
          <div className="flex-1">
            <label
              htmlFor="avatarFile"
              className="mb-1.5 block text-sm font-medium text-foreground/80"
            >
              Profile Photo
            </label>
            <input
              id="avatarFile"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleAvatarChange}
              className="block w-full text-sm text-foreground/80 file:mr-4 file:rounded-lg file:border file:border-border file:bg-background file:px-3 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:border-primary/50"
            />
            {errors.avatarFile && (
              <p className="mt-1 text-xs text-primary">{errors.avatarFile}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="displayName"
            className="mb-1.5 block text-sm font-medium text-foreground/80"
          >
            Display Name <span className="text-primary">*</span>
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
            htmlFor="title"
            className="mb-1.5 block text-sm font-medium text-foreground/80"
          >
            Investigator Title
          </label>
          <input
            id="title"
            type="text"
            value={values.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
            placeholder="Lead Researcher, Amateur Sleuth, etc."
          />
          {errors.title && (
            <p className="mt-1 text-xs text-primary">{errors.title}</p>
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="location"
              className="mb-1.5 block text-sm font-medium text-foreground/80"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              value={values.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
              placeholder="City, Country"
            />
            {errors.location && (
              <p className="mt-1 text-xs text-primary">{errors.location}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="website"
              className="mb-1.5 block text-sm font-medium text-foreground/80"
            >
              Website
            </label>
            <input
              id="website"
              type="text"
              value={values.website}
              onChange={(e) => handleChange("website", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
              placeholder="https://your-site.com"
            />
            {errors.website && (
              <p className="mt-1 text-xs text-primary">{errors.website}</p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground/80">
            Email
          </label>
          <input
            type="text"
            value={userEmail}
            disabled
            readOnly
            className="w-full cursor-not-allowed rounded-lg border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground/60"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            onClick={() => router.push("/my-dossier")}
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

      <div className="flex w-full flex-col gap-4 rounded-xl border border-primary/40 bg-card p-5 sm:p-6">
        <div className="flex items-center gap-2 text-primary">
          <FiAlertTriangle size={18} />
          <h2 className="text-base font-semibold">Danger Zone</h2>
        </div>
        <p className="text-sm text-foreground/70">
          Deleting your account permanently removes your dossier, submitted
          cases, and community activity. This action cannot be undone.
        </p>
        <Button
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
          className="w-fit rounded-lg border border-primary px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary hover:text-foreground"
        >
          Delete Account
        </Button>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-primary">
                <FiAlertTriangle size={24} />
                <h3 className="text-lg font-semibold">Delete Account?</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="text-muted hover:text-foreground cursor-pointer disabled:opacity-50"
              >
                <FiX size={20} />
              </button>
            </div>
            <p className="mb-6 text-sm text-foreground/70">
              Deleting your account permanently removes your dossier, submitted
              cases, and community activity. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground/80 hover:border-primary/40 hover:text-primary disabled:opacity-50"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground hover:opacity-90 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete My Account"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
