import { caseFiles, trendingTheories, type CaseFile } from "./blackxcross";

export type UserRole = "Member" | "Investigator" | "Group Owner" | "Admin";
export type UserStatus = "Active" | "Suspended" | "Banned";

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinDate: string;
  casesSubmitted: number;
  reportsFiled: number;
}

export const adminUsers: AdminUser[] = [
  {
    id: "user-1",
    username: "Diego_RedTiger",
    email: "diego.redtiger@example.com",
    role: "Investigator",
    status: "Active",
    joinDate: "2024-02-11",
    casesSubmitted: 6,
    reportsFiled: 0,
  },
  {
    id: "user-2",
    username: "TrueCrimeJane",
    email: "jane.doe@example.com",
    role: "Investigator",
    status: "Active",
    joinDate: "2024-05-03",
    casesSubmitted: 3,
    reportsFiled: 1,
  },
  {
    id: "user-3",
    username: "ForensicPhil",
    email: "phil.morris@example.com",
    role: "Group Owner",
    status: "Active",
    joinDate: "2023-11-20",
    casesSubmitted: 9,
    reportsFiled: 2,
  },
  {
    id: "user-4",
    username: "Investigator_X",
    email: "unknown.user@example.com",
    role: "Member",
    status: "Suspended",
    joinDate: "2025-01-15",
    casesSubmitted: 1,
    reportsFiled: 4,
  },
  {
    id: "user-5",
    username: "Alexis_Stokes",
    email: "alexis.stokes@example.com",
    role: "Investigator",
    status: "Banned",
    joinDate: "2024-08-07",
    casesSubmitted: 2,
    reportsFiled: 6,
  },
];

export type ReportReason =
  | "Harassment"
  | "Spam"
  | "False Information"
  | "Inappropriate Content"
  | "Other";
export type ReportStatus = "Pending" | "Resolved" | "Dismissed";

export interface Report {
  id: string;
  reporter: string;
  targetType: "Case" | "Comment" | "Theory" | "User";
  targetLabel: string;
  reason: ReportReason;
  details: string;
  status: ReportStatus;
  submittedAt: string;
}

export const adminReports: Report[] = [
  {
    id: "report-1",
    reporter: "TrueCrimeJane",
    targetType: "Comment",
    targetLabel: "Comment on The 1984 Highway Slip",
    reason: "Harassment",
    details: "User is targeting another investigator with personal insults.",
    status: "Pending",
    submittedAt: "2026-09-02",
  },
  {
    id: "report-2",
    reporter: "ForensicPhil",
    targetType: "Theory",
    targetLabel: "Could the Silent Signal be a military project?",
    reason: "False Information",
    details: "Theory cites a fabricated government document.",
    status: "Pending",
    submittedAt: "2026-09-01",
  },
  {
    id: "report-3",
    reporter: "Investigator_X",
    targetType: "User",
    targetLabel: "Alexis_Stokes",
    reason: "Spam",
    details: "Repeatedly posting identical comments across multiple cases.",
    status: "Resolved",
    submittedAt: "2026-08-28",
  },
  {
    id: "report-4",
    reporter: "Diego_RedTiger",
    targetType: "Case",
    targetLabel: "Hinterkaifeck Murders Revisited",
    reason: "Inappropriate Content",
    details: "Uploaded evidence image contains unrelated graphic content.",
    status: "Dismissed",
    submittedAt: "2026-08-20",
  },
];

export type ModerationStatus = "Flagged" | "Approved" | "Rejected";

export interface ModerationItem {
  id: string;
  contentType: "Case" | "Comment" | "Theory";
  contentLabel: string;
  submittedBy: string;
  aiFlagReason: string;
  status: ModerationStatus;
  flaggedAt: string;
}

export const moderationItems: ModerationItem[] = [
  {
    id: "mod-1",
    contentType: "Case",
    contentLabel: "Alpine Anomaly Team",
    submittedBy: "Diego_RedTiger",
    aiFlagReason: "Possible duplicate of an existing archived case.",
    status: "Flagged",
    flaggedAt: "2026-09-03",
  },
  {
    id: "mod-2",
    contentType: "Comment",
    contentLabel: "Comment on The Silent Signal Transmission",
    submittedBy: "Investigator_X",
    aiFlagReason: "Flagged for aggressive language.",
    status: "Flagged",
    flaggedAt: "2026-09-02",
  },
  {
    id: "mod-3",
    contentType: "Theory",
    contentLabel: "New evidence in Hinterkaifeck case changes everything",
    submittedBy: "ForensicPhil",
    aiFlagReason: "Unverified external link detected in submission.",
    status: "Approved",
    flaggedAt: "2026-08-30",
  },
];

export type AdminCommentStatus = "Visible" | "Hidden" | "Flagged";

export interface AdminComment {
  id: string;
  author: string;
  text: string;
  caseLabel: string;
  status: AdminCommentStatus;
  postedAt: string;
}

export const adminComments: AdminComment[] = [
  {
    id: "comment-1",
    author: "TrueCrimeJane",
    text: "The timestamps on the trail camera stills don't line up with the official search log.",
    caseLabel: "The Alpine Anomaly Team",
    status: "Visible",
    postedAt: "2026-09-02",
  },
  {
    id: "comment-2",
    author: "ForensicPhil",
    text: "Requesting the original weather station data for that week.",
    caseLabel: "The Alpine Anomaly Team",
    status: "Visible",
    postedAt: "2026-09-01",
  },
  {
    id: "comment-3",
    author: "Investigator_X",
    text: "This is a waste of everyone's time, obviously fake.",
    caseLabel: "The Silent Signal Transmission",
    status: "Flagged",
    postedAt: "2026-09-02",
  },
];

export interface AdminGroup {
  id: string;
  name: string;
  ownerUsername: string;
  memberCount: number;
  status: "Active" | "Archived";
  createdAt: string;
}

export const adminGroups: AdminGroup[] = [
  {
    id: "group-1",
    name: "Alpine Anomaly Team",
    ownerUsername: "Diego_RedTiger",
    memberCount: 18,
    status: "Active",
    createdAt: "2024-03-01",
  },
  {
    id: "group-2",
    name: "Bay Area Cold Case Force",
    ownerUsername: "ForensicPhil",
    memberCount: 12,
    status: "Active",
    createdAt: "2024-06-15",
  },
  {
    id: "group-3",
    name: "Hinterkaifeck Think Tank",
    ownerUsername: "ForensicPhil",
    memberCount: 73,
    status: "Active",
    createdAt: "2023-09-10",
  },
];

export interface AnalyticsPoint {
  label: string;
  value: number;
}

export const analyticsOverview = {
  totalUsers: 3457,
  activeInvestigations: 128,
  pendingReports: adminReports.filter((r) => r.status === "Pending").length,
  flaggedContent: moderationItems.filter((m) => m.status === "Flagged")
    .length,
};

export const signupsOverTime: AnalyticsPoint[] = [
  { label: "Apr", value: 210 },
  { label: "May", value: 340 },
  { label: "Jun", value: 295 },
  { label: "Jul", value: 410 },
  { label: "Aug", value: 380 },
  { label: "Sep", value: 460 },
];

export const adminCases: CaseFile[] = caseFiles;
export const adminTheories = trendingTheories;

export const adminNav = [
  { id: "dashboard", label: "Dashboard", href: "/admin/dashboard" },
  { id: "users", label: "Users", href: "/admin/users" },
  { id: "cases", label: "Cases", href: "/admin/cases" },
  { id: "moderation", label: "Moderation", href: "/admin/moderation" },
  { id: "reports", label: "Reports", href: "/admin/reports" },
  { id: "theories", label: "Theories", href: "/admin/theories" },
  { id: "comments", label: "Comments", href: "/admin/comments" },
  { id: "groups", label: "Groups", href: "/admin/groups" },
  { id: "analytics", label: "Analytics", href: "/admin/analytics" },
  { id: "settings", label: "Settings", href: "/admin/settings" },
] as const;