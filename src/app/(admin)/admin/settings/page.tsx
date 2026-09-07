"use client";

import { useState } from "react";
import { FiSave } from "react-icons/fi";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    aiModerationEnabled: true,
    autoFlagThreshold: "Medium",
    requireApprovalForNewCases: true,
    allowGuestBrowsing: true,
    platformName: "BLACK×CROSS",
  });
  const [saved, setSaved] = useState(false);

  const handleToggle = (field: "aiModerationEnabled" | "requireApprovalForNewCases" | "allowGuestBrowsing") => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <div className="flex w-full flex-col gap-6 ">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        Settings
      </h1>

      <form
        onSubmit={handleSave}
        className="flex w-full flex-col gap-6 rounded-xl border border-border p-5 sm:p-6"
      >
        <div>
          <label
            htmlFor="platformName"
            className="mb-1.5 block text-sm font-medium text-foreground/80"
          >
            Platform Name
          </label>
          <input
            id="platformName"
            type="text"
            value={settings.platformName}
            onChange={(e) => {
              setSettings((prev) => ({
                ...prev,
                platformName: e.target.value,
              }));
              setSaved(false);
            }}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="autoFlagThreshold"
            className="mb-1.5 block text-sm font-medium text-foreground/80"
          >
            AI Auto-Flag Sensitivity
          </label>
          <select
            id="autoFlagThreshold"
            value={settings.autoFlagThreshold}
            onChange={(e) => {
              setSettings((prev) => ({
                ...prev,
                autoFlagThreshold: e.target.value,
              }));
              setSaved(false);
            }}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-5">
          <label className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-foreground/80">
              Enable AI Moderation
            </span>
            <input
              type="checkbox"
              checked={settings.aiModerationEnabled}
              onChange={() => handleToggle("aiModerationEnabled")}
              className="h-4 w-4 accent-primary"
            />
          </label>

          <label className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-foreground/80">
              Require Approval for New Cases
            </span>
            <input
              type="checkbox"
              checked={settings.requireApprovalForNewCases}
              onChange={() => handleToggle("requireApprovalForNewCases")}
              className="h-4 w-4 accent-primary"
            />
          </label>

          <label className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-foreground/80">
              Allow Guest Browsing
            </span>
            <input
              type="checkbox"
              checked={settings.allowGuestBrowsing}
              onChange={() => handleToggle("allowGuestBrowsing")}
              className="h-4 w-4 accent-primary"
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
          {saved && (
            <span className="text-xs font-medium text-success">
              Settings saved
            </span>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground hover:opacity-90"
          >
            <FiSave size={16} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}