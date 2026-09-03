export type CaseStatus = "COLD CASE" | "OPEN CASE";

export interface CaseFile {
  id: string;
  image: string;
  caseNumber: string;
  status: CaseStatus;
  title: string;
  description: string;
  theoryCount: number;
  ctaLabel: string;
}

export const caseFiles: CaseFile[] = [
  {
    id: "alpine-anomaly-team",
    image: "/image/bg1.jpeg",
    caseNumber: "#CAS-7781",
    status: "COLD CASE",
    title: "The Alpine Anomaly Team",
    description: "Unexplained disappearances of hikers in the Alpine region.",
    theoryCount: 14,
    ctaLabel: "Open Dossier",
  },
  {
    id: "1984-highway-slip",
    image: "/image/bg1.jpeg",
    caseNumber: "#CAS-5192",
    status: "COLD CASE",
    title: "The 1984 Highway Slip",
    description: "Strange case of a bus disappearance leaving behind no trace.",
    theoryCount: 11,
    ctaLabel: "Open Dossier",
  },
  {
    id: "silent-signal-transmission",
    image: "/image/bg1.jpeg",
    caseNumber: "#CAS-6621",
    status: "COLD CASE",
    title: "The Silent Signal Transmission",
    description:
      "Mysterious radio transmissions received from an unknown source.",
    theoryCount: 26,
    ctaLabel: "Open Dossier",
  },
  {
    id: "alpine-ridge-disappearance",
    image: "/image/bg1.jpeg",
    caseNumber: "#CAS-3320",
    status: "COLD CASE",
    title: "The Alpine Ridge Disappearance",
    description:
      "A group of friends vanished without a trace during a winter expedition.",
    theoryCount: 9,
    ctaLabel: "Open Dossier",
  },
  {
    id: "hinterkaifeck-murders-revisited-2",
    image: "/image/bg1.jpeg",
    caseNumber: "#CAS-9102",
    status: "COLD CASE",
    title: "Hinterkaifeck Murders Revisited",
    description:
      "Re-examining new evidence in the historic unsolved murder case.",
    theoryCount: 7,
    ctaLabel: "Join Investigation",
  },
  {
    id: "hinterkaifeck-murders-revisited",
    image: "/image/bg1.jpeg",
    caseNumber: "#CAS-9102",
    status: "COLD CASE",
    title: "Hinterkaifeck Murders Revisited",
    description:
      "Re-examining new evidence in the historic unsolved murder case.",
    theoryCount: 7,
    ctaLabel: "Join Investigation",
  },
];

export const caseFilters = [
  "All Cases",
  "Cold Cases",
  "Recent Submissions",
  "Open Investigations",
] as const;

export interface MyGroup {
  id: string;
  name: string;
  memberCount: number;
}

export const myGroups: MyGroup[] = [
  { id: "alpine-anomaly", name: "Alpine Anomaly Team", memberCount: 18 },
  { id: "bay-area-ccf", name: "Bay Area Cold Case Force", memberCount: 12 },
  {
    id: "hinterkaifeck-think-tank",
    name: "Hinterkaifeck Think Tank",
    memberCount: 73,
  },
];

export interface Contact {
  id: string;
  name: string;
  online: boolean;
}

export const myContacts: Contact[] = [
  { id: "investigator-x-1", name: "Investigator_X", online: true },
  { id: "truecrimejane", name: "TrueCrimeJane", online: true },
  { id: "forensicphil-1", name: "ForensicPhil", online: true },
  { id: "forensicphil-2", name: "ForensicPhil", online: true },
  { id: "investigator-x-2", name: "Investigator_X", online: true },
];

export type ActivityIcon = "pin" | "comment" | "attachment" | "message";

export interface ActivityItem {
  id: string;
  actor: string;
  avatar: string;
  action: string;
  target: string;
  timeAgo: string;
  icon: ActivityIcon;
  meta?: string;
}
export interface SpotlightMember {
  id: string;
  name: string;
  role: string;
  contributions: number;
  avatar: string;
}

export const activityItems: ActivityItem[] = [
  {
    id: "activity-1",
    avatar: "/image/bg1.jpeg",
    actor: "Alpine Anomaly Team",
    action: "posted an update in",
    target: "Bay Area Cold Case Force",
    timeAgo: "2 min ago",
    icon: "pin",
  },
  {
    id: "activity-2",
    avatar: "/image/bg1.jpeg",
    actor: "TrueCrimeJane",
    action: "shared a theory in",
    target: "The Silent Signal Transmission",
    timeAgo: "15 min ago",
    icon: "comment",
    meta: "5",
  },
  {
    id: "activity-3",
    avatar: "/image/bg1.jpeg",
    actor: "ForensicPhil",
    action: "uploaded new evidence in",
    target: "Hinterkaifeck Murders Revisited",
    timeAgo: "1 hour ago",
    icon: "attachment",
  },
  {
    id: "activity-4",
    avatar: "/image/bg1.jpeg",
    actor: "Investigator_X",
    action: "joined the discussion in",
    target: "The 1984 Highway Slip",
    timeAgo: "2 hours ago",
    icon: "message",
  },
];

export interface InvestigationStat {
  id: string;
  label: string;
  value: string;
}

export const investigationStats: InvestigationStat[] = [
  { id: "active-investigations", label: "Active Investigations", value: "128" },
  { id: "countries-involved", label: "Countries Involved", value: "42" },
  { id: "community-members", label: "Community Members", value: "3,457" },
];

export interface MapMarker {
  id: string;
  top: string;
  left: string;
}

export const mapMarkers: MapMarker[] = [
  { id: "m1", top: "22%", left: "18%" },
  { id: "m2", top: "30%", left: "24%" },
  { id: "m3", top: "28%", left: "46%" },
  { id: "m4", top: "20%", left: "52%" },
  { id: "m5", top: "35%", left: "58%" },
  { id: "m6", top: "40%", left: "64%" },
  { id: "m7", top: "48%", left: "70%" },
  { id: "m8", top: "55%", left: "78%" },
  { id: "m9", top: "60%", left: "30%" },
  { id: "m10", top: "68%", left: "34%" },
  { id: "m11", top: "45%", left: "40%" },
  { id: "m12", top: "38%", left: "50%" },
  { id: "m13", top: "25%", left: "80%" },
  { id: "m14", top: "50%", left: "20%" },
  { id: "m15", top: "62%", left: "60%" },
];

export interface TrendingTheory {
  id: string;
  text: string;
  likes: number;
}

export const trendingTheories: TrendingTheory[] = [
  { id: "t1", text: "The connection between unsolved Alpine cases", likes: 92 },
  {
    id: "t2",
    text: "Possible link between 1984 bus incident and radio signals",
    likes: 68,
  },
  {
    id: "t3",
    text: "New evidence in Hinterkaifeck case changes everything",
    likes: 53,
  },
  {
    id: "t4",
    text: "Could the Silent Signal be a military project?",
    likes: 47,
  },
];

export interface SpotlightMember {
  id: string;
  name: string;
  role: string;
  contributions: number;
}

export const memberSpotlight: SpotlightMember[] = [
  {
    id: "diego-red-tiger",
    name: "Diego Red Tiger",
    role: "Top Contributor",
    contributions: 124,
    avatar: "/image/bg1.jpeg",
  },
  {
    id: "alexis-stokes",
    name: "Alexis Stokes",
    role: "Rising Investigator",
    contributions: 87,
    avatar: "/image/bg1.jpeg",
  },
];

export const sidebarNav = [
  { id: "home", label: "Home", href: "/" },
  { id: "archives", label: "Archives", href: "/archives" },
  { id: "community-hub", label: "Community Hub", href: "/community" },
  { id: "my-dossier", label: "My Dossier", href: "/my-dossier" },
] as const;

export const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export interface DirectoryMember {
  username: string;
  name: string;
  role: string;
  contributions: number;
}

export const allMembers: DirectoryMember[] = [
  ...memberSpotlight.map((m) => ({
    username: slugify(m.name),
    name: m.name,
    role: m.role,
    contributions: m.contributions,
  })),
  ...myContacts.map((c, i) => ({
    username: `${slugify(c.name)}-${i}`,
    name: c.name,
    role: c.online ? "Online" : "Offline",
    contributions: 0,
  })),
];
