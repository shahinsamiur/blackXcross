export type CaseStatus = "COLD CASE" | "OPEN CASE";

export interface CaseEvidenceItem {
  id: string;
  label: string;
  type: "image" | "document" | "audio";
}

export interface CaseComment {
  id: string;
  author: string;
  text: string;
  timeAgo: string;
}

export interface CaseFile {
  id: string;
  image: string;
  caseNumber: string;
  status: CaseStatus;
  title: string;
  description: string;
  theoryCount: number;
  ctaLabel: string;
  narrative?: string;
  gallery?: string[];
  location?: string;
  evidence?: CaseEvidenceItem[];
  relatedTheoryIds?: string[];
  comments?: CaseComment[];
  submittedAt: string;
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
    narrative:
      "In the summer of 1998, a five-person hiking team set out to survey Ridge 4 in the Alpine region and never returned. Search parties recovered camping equipment and a partially destroyed trail camera, but no bodies were ever found. The case resurfaced in community archives after a similar disappearance pattern was noted along the same ridge line decades later.",
    gallery: ["/image/bg1.jpeg", "/image/hero1.jpg", "/image/hero2.jpg"],
    location: "Alpine Region, Switzerland",
    evidence: [
      { id: "ev-1", label: "Trail camera footage, Ridge 4", type: "image" },
      { id: "ev-2", label: "Missing persons report (1998)", type: "document" },
      { id: "ev-3", label: "Radio distress recording", type: "audio" },
    ],
    relatedTheoryIds: ["t1"],
    comments: [
      {
        id: "c-1",
        author: "TrueCrimeJane",
        text: "The timestamps on the trail camera stills don't line up with the official search log. Worth a second look.",
        timeAgo: "3 hours ago",
      },
      {
        id: "c-2",
        author: "ForensicPhil",
        text: "Requesting the original weather station data for that week if anyone has archive access.",
        timeAgo: "1 day ago",
      },
      
    ],
    submittedAt: "2026-06-02",
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
    narrative:
      "A passenger bus travelling overnight along an isolated interstate stretch never arrived at its scheduled stop. No wreckage, skid marks, or passenger belongings were ever recovered along the route, despite a multi-agency search. The case has drawn renewed attention after unconfirmed radio chatter from the same period was rediscovered in a decommissioned relay station archive.",
    gallery: ["/image/bg1.jpeg", "/image/hero2.jpg"],
    location: "Interstate 40, Nevada",
    evidence: [
      { id: "ev-4", label: "Dispatch log, night of the incident", type: "document" },
      { id: "ev-5", label: "Relay station audio archive", type: "audio" },
    ],
    relatedTheoryIds: ["t2"],
    comments: [
      {
        id: "c-3",
        author: "Investigator_X",
        text: "The relay station audio and the bus route overlap almost exactly — has anyone cross-referenced the timestamps?",
        timeAgo: "6 hours ago",
      },
    ],
    submittedAt: "2026-06-02",
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
    narrative:
      "Amateur radio operators across three states independently logged an identical, unexplained transmission pattern over a period of six weeks. The signal has never been traced to a licensed source, and its structure has resisted every decoding attempt submitted to the community so far.",
    gallery: ["/image/bg1.jpeg", "/image/hero1.jpg"],
    location: "Undisclosed listening post, Pacific Northwest",
    evidence: [
      { id: "ev-6", label: "Raw signal recording, week 1", type: "audio" },
      { id: "ev-7", label: "Operator log compilation", type: "document" },
    ],
    relatedTheoryIds: ["t4"],
    comments: [
      {
        id: "c-4",
        author: "ForensicPhil",
        text: "Ran the waveform through a basic spectrogram — there's a repeating structure every 47 seconds.",
        timeAgo: "20 min ago",
      },
      {
        id: "c-5",
        author: "TrueCrimeJane",
        text: "Could this just be an old numbers station? Worth ruling out first.",
        timeAgo: "45 min ago",
      },
    ],
    submittedAt: "2026-06-02",
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
    narrative:
      "Four friends on a planned three-day winter expedition failed to check in at their final waypoint. Their base camp was found intact and undisturbed, with no signs of struggle or a hurried departure, leaving investigators without a clear timeline of what happened after their last radio contact.",
    gallery: ["/image/bg1.jpeg", "/image/hero2.jpg"],
    location: "Alpine Ridge, Switzerland",
    evidence: [
      { id: "ev-8", label: "Base camp photographs", type: "image" },
      { id: "ev-9", label: "Final radio check-in transcript", type: "document" },
    ],
    relatedTheoryIds: ["t1"],
    comments: [
      {
        id: "c-6",
        author: "Investigator_X",
        text: "The intact base camp is the strangest part of this one — no gear was ever missing.",
        timeAgo: "2 days ago",
      },
    ],
    submittedAt: "2026-06-02",
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
    narrative:
      "One of the most enduring unsolved cases on record, revisited here with newly digitized farm records and witness statements. This investigation group is compiling cross-referenced timelines from archival sources to re-examine long-standing assumptions about the case.",
    gallery: ["/image/bg1.jpeg", "/image/hero1.jpg"],
    location: "Hinterkaifeck Farm, Bavaria, Germany",
    evidence: [
      { id: "ev-10", label: "Digitized farm ledger pages", type: "document" },
      { id: "ev-11", label: "Witness statement transcripts", type: "document" },
    ],
    relatedTheoryIds: ["t3"],
    comments: [
      {
        id: "c-7",
        author: "ForensicPhil",
        text: "Uploaded the newly digitized ledger pages — footfall pattern near the barn entry is worth discussing.",
        timeAgo: "1 hour ago",
      },
    ],
    submittedAt: "2026-06-02",
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
    narrative:
      "One of the most enduring unsolved cases on record, revisited here with newly digitized farm records and witness statements. This investigation group is compiling cross-referenced timelines from archival sources to re-examine long-standing assumptions about the case.",
    gallery: ["/image/bg1.jpeg", "/image/hero1.jpg"],
    location: "Hinterkaifeck Farm, Bavaria, Germany",
    evidence: [
      { id: "ev-12", label: "Digitized farm ledger pages", type: "document" },
      { id: "ev-13", label: "Witness statement transcripts", type: "document" },
    ],
    relatedTheoryIds: ["t3"],
    comments: [
      {
        id: "c-8",
        author: "ForensicPhil",
        text: "Uploaded the newly digitized ledger pages — footfall pattern near the barn entry is worth discussing.",
        timeAgo: "1 hour ago",
      },
    ],
    submittedAt: "2026-06-02",
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
  caseId: string;
  text: string;
  body: string;
  author: string;
  postedAt: string;
  likes: number;
  comments?: CaseComment[];
}

export const trendingTheories: TrendingTheory[] = [
  {
    id: "t1",
    caseId: "alpine-anomaly-team",
    text: "The connection between unsolved Alpine cases",
    body:
      "Cross-referencing search-party logs from both Alpine disappearances shows the same ridge line was flagged as 'unstable terrain, avoid after dusk' in two separate expedition briefings, six years apart. Neither case's official report mentions this warning existed prior to the incident. If the same routing hazard was known and undocumented twice, it raises the question of whether these are isolated disappearances or a recurring pattern tied to the terrain itself rather than coincidence.",
    author: "TrueCrimeJane",
    postedAt: "2 days ago",
    likes: 92,
    comments: [
      {
        id: "tc-1",
        author: "ForensicPhil",
        text: "Do we have the original briefing documents, or just secondhand references to them?",
        timeAgo: "1 day ago",
      },
      {
        id: "tc-2",
        author: "Investigator_X",
        text: "I can request the archive copies from the ranger station next week.",
        timeAgo: "20 hours ago",
      },
    ],
  },
  {
    id: "t2",
    caseId: "1984-highway-slip",
    text: "Possible link between 1984 bus incident and radio signals",
    body:
      "The rediscovered relay station audio archive contains an unidentified transmission logged less than an hour before the bus's last confirmed radio check-in. The frequency doesn't match any known dispatch channel for that route. This theory proposes the transmission may have been a rerouting instruction the driver mistook for legitimate dispatch, which would explain the total absence of wreckage along the expected path.",
    author: "Investigator_X",
    postedAt: "6 hours ago",
    likes: 68,
    comments: [
      {
        id: "tc-3",
        author: "TrueCrimeJane",
        text: "Has anyone confirmed the relay station's transmission range actually reached that stretch of the interstate?",
        timeAgo: "4 hours ago",
      },
    ],
  },
  {
    id: "t3",
    caseId: "hinterkaifeck-murders-revisited",
    text: "New evidence in Hinterkaifeck case changes everything",
    body:
      "The newly digitized farm ledger pages show a payment entry dated four days after the presumed date of the murders, recorded in a hand that doesn't match the household's known signatures. Combined with the witness statement transcripts describing smoke from the chimney days after the family was believed dead, this raises the possibility of an extended timeline that existing theories haven't accounted for.",
    author: "ForensicPhil",
    postedAt: "1 hour ago",
    likes: 53,
    comments: [
      {
        id: "tc-4",
        author: "Investigator_X",
        text: "Handwriting comparison would be huge if it holds up — is the ledger page scan public yet?",
        timeAgo: "40 min ago",
      },
    ],
  },
  {
    id: "t4",
    caseId: "silent-signal-transmission",
    text: "Could the Silent Signal be a military project?",
    body:
      "The repeating 47-second structure identified in the spectrogram analysis is consistent with known numbers-station cadences, but the frequency band doesn't match any publicly documented military or intelligence broadcast range from the relevant period. This theory doesn't claim a definitive military origin, but argues the signal's structure is too deliberate to be incidental interference, and proposes cross-referencing declassified frequency allocations as a next step.",
    author: "ForensicPhil",
    postedAt: "20 min ago",
    likes: 47,
    comments: [
      {
        id: "tc-5",
        author: "TrueCrimeJane",
        text: "Worth ruling out an old numbers station first before jumping to military.",
        timeAgo: "10 min ago",
      },
    ],
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
