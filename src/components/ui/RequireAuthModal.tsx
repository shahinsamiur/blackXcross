"use client";

import { useRouter } from "next/navigation";
import { FiX, FiLogIn } from "react-icons/fi";

interface RequireAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetPath: string;
}

export default function RequireAuthModal({ isOpen, onClose, targetPath }: RequireAuthModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Sign In Required</h3>
          <button onClick={onClose} className="text-muted hover:text-foreground cursor-pointer">
            <FiX size={20} />
          </button>
        </div>
        <p className="text-sm text-muted mb-6">
          You need to be signed in to access this page.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-card cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              router.push(`/auth/login?redirect=${encodeURIComponent(targetPath)}`);
            }}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground hover:opacity-90 cursor-pointer"
          >
            <FiLogIn size={16} />
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}