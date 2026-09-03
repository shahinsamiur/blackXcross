export type GroupVisibility = "public" | "private";
export type GroupActivity = "online" | "offline";

export interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  category: string;
  memberCount: number;
  onlineCount: number;
  visibility: GroupVisibility;
  activity: GroupActivity;
  owner: string;
  createdAt: string;
  joined: boolean;
}

export const groups: Group[] = [
  {
    id: "alpine-anomaly",
    name: "Alpine Anomaly Team",
    description:
      "Tracking unexplained hiker disappearances across the Alpine region.",
    avatar: "/image/bg1.jpeg",
    category: "Missing Persons",
    memberCount: 18,
    onlineCount: 4,
    visibility: "private",
    activity: "online",
    owner: "Diego Red Tiger",
    createdAt: "Jan 2024",
    joined: true,
  },
  {
    id: "bay-area-ccf",
    name: "Bay Area Cold Case Force",
    description: "Regional cold case collective covering the Bay Area.",
    avatar: "/image/hero1.jpg",
    category: "Regional",
    memberCount: 12,
    onlineCount: 2,
    visibility: "public",
    activity: "online",
    owner: "Alexis Stokes",
    createdAt: "Mar 2024",
    joined: true,
  },
  {
    id: "hinterkaifeck-think-tank",
    name: "Hinterkaifeck Think Tank",
    description:
      "Deep-dive research group re-examining the Hinterkaifeck murders.",
    avatar: "/image/hero2.jpg",
    category: "Historic Cases",
    memberCount: 73,
    onlineCount: 9,
    visibility: "public",
    activity: "online",
    owner: "ForensicPhil",
    createdAt: "Aug 2023",
    joined: true,
  },
  {
    id: "silent-signal-society",
    name: "Silent Signal Society",
    description: "Investigating the unexplained radio transmission case.",
    avatar: "/image/bg1.jpeg",
    category: "Unexplained",
    memberCount: 41,
    onlineCount: 1,
    visibility: "public",
    activity: "offline",
    owner: "TrueCrimeJane",
    createdAt: "Nov 2023",
    joined: false,
  },
  {
    id: "highway-slip-researchers",
    name: "Highway Slip Researchers",
    description: "Private working group on the 1984 Highway Slip case.",
    avatar: "/image/hero1.jpg",
    category: "Cold Cases",
    memberCount: 9,
    onlineCount: 0,
    visibility: "private",
    activity: "offline",
    owner: "Investigator_X",
    createdAt: "Feb 2025",
    joined: false,
  },
  {
    id: "midwest-cold-case-network",
    name: "Midwest Cold Case Network",
    description: "Community network sharing leads across Midwest cases.",
    avatar: "/image/hero2.jpg",
    category: "Regional",
    memberCount: 27,
    onlineCount: 3,
    visibility: "public",
    activity: "online",
    owner: "Diego Red Tiger",
    createdAt: "Jun 2024",
    joined: false,
  },
];

export type GroupMemberRole = "owner" | "admin" | "member";

export interface GroupMember {
  id: string;
  groupId: string;
  username: string;
  name: string;
  role: GroupMemberRole;
  online: boolean;
  joinedAt: string;
  contributions: number;
}

export const groupMembers: GroupMember[] = [
  {
    id: "gm1",
    groupId: "alpine-anomaly",
    username: "diego-red-tiger",
    name: "Diego Red Tiger",
    role: "owner",
    online: true,
    joinedAt: "Jan 2024",
    contributions: 124,
  },
  {
    id: "gm2",
    groupId: "alpine-anomaly",
    username: "truecrimejane",
    name: "TrueCrimeJane",
    role: "admin",
    online: true,
    joinedAt: "Jan 2024",
    contributions: 58,
  },
  {
    id: "gm3",
    groupId: "alpine-anomaly",
    username: "forensicphil-1",
    name: "ForensicPhil",
    role: "member",
    online: false,
    joinedAt: "Feb 2024",
    contributions: 22,
  },
  {
    id: "gm4",
    groupId: "alpine-anomaly",
    username: "investigator-x-1",
    name: "Investigator_X",
    role: "member",
    online: true,
    joinedAt: "Mar 2024",
    contributions: 15,
  },
  {
    id: "gm5",
    groupId: "bay-area-ccf",
    username: "alexis-stokes",
    name: "Alexis Stokes",
    role: "owner",
    online: true,
    joinedAt: "Mar 2024",
    contributions: 87,
  },
  {
    id: "gm6",
    groupId: "bay-area-ccf",
    username: "forensicphil-2",
    name: "ForensicPhil",
    role: "member",
    online: false,
    joinedAt: "Apr 2024",
    contributions: 19,
  },
  {
    id: "gm7",
    groupId: "bay-area-ccf",
    username: "investigator-x-2",
    name: "Investigator_X",
    role: "member",
    online: false,
    joinedAt: "May 2024",
    contributions: 8,
  },
  {
    id: "gm8",
    groupId: "hinterkaifeck-think-tank",
    username: "forensicphil-3",
    name: "ForensicPhil",
    role: "owner",
    online: true,
    joinedAt: "Aug 2023",
    contributions: 210,
  },
  {
    id: "gm9",
    groupId: "hinterkaifeck-think-tank",
    username: "diego-red-tiger-2",
    name: "Diego Red Tiger",
    role: "admin",
    online: false,
    joinedAt: "Sep 2023",
    contributions: 96,
  },
  {
    id: "gm10",
    groupId: "hinterkaifeck-think-tank",
    username: "truecrimejane-2",
    name: "TrueCrimeJane",
    role: "member",
    online: true,
    joinedAt: "Oct 2023",
    contributions: 40,
  },
];

export interface Channel {
  id: string;
  groupId: string;
  name: string;
  description: string;
  unreadCount: number;
}

export const channels: Channel[] = [
  {
    id: "alpine-anomaly-general",
    groupId: "alpine-anomaly",
    name: "general",
    description: "General discussion for the team.",
    unreadCount: 3,
  },
  {
    id: "alpine-anomaly-evidence-locker",
    groupId: "alpine-anomaly",
    name: "evidence-locker",
    description: "Shared evidence and documents.",
    unreadCount: 0,
  },
  {
    id: "alpine-anomaly-theories",
    groupId: "alpine-anomaly",
    name: "theories",
    description: "Working theories and leads.",
    unreadCount: 1,
  },

  {
    id: "bay-area-ccf-general",
    groupId: "bay-area-ccf",
    name: "general",
    description: "General discussion for the team.",
    unreadCount: 0,
  },
  {
    id: "bay-area-ccf-evidence-locker",
    groupId: "bay-area-ccf",
    name: "evidence-locker",
    description: "Shared evidence and documents.",
    unreadCount: 2,
  },
  {
    id: "bay-area-ccf-theories",
    groupId: "bay-area-ccf",
    name: "theories",
    description: "Working theories and leads.",
    unreadCount: 0,
  },

  {
    id: "hinterkaifeck-think-tank-general",
    groupId: "hinterkaifeck-think-tank",
    name: "general",
    description: "General discussion for the team.",
    unreadCount: 5,
  },
  {
    id: "hinterkaifeck-think-tank-evidence-locker",
    groupId: "hinterkaifeck-think-tank",
    name: "evidence-locker",
    description: "Shared evidence and documents.",
    unreadCount: 0,
  },
  {
    id: "hinterkaifeck-think-tank-theories",
    groupId: "hinterkaifeck-think-tank",
    name: "theories",
    description: "Working theories and leads.",
    unreadCount: 0,
  },
];

export interface ChannelMessage {
  id: string;
  channelId: string;
  author: string;
  avatar: string;
  text: string;
  timeAgo: string;
}

export const channelMessages: ChannelMessage[] = [
  {
    id: "msg1",
    channelId: "alpine-anomaly-general",
    author: "Diego Red Tiger",
    avatar: "/image/bg1.jpeg",
    text: "Pulled the weather logs for the ridge on the night of the disappearance.",
    timeAgo: "2 hours ago",
  },
  {
    id: "msg2",
    channelId: "alpine-anomaly-general",
    author: "TrueCrimeJane",
    avatar: "/image/hero1.jpg",
    text: "Any luck matching that against the ranger station reports?",
    timeAgo: "1 hour ago",
  },
  {
    id: "msg3",
    channelId: "alpine-anomaly-general",
    author: "ForensicPhil",
    avatar: "/image/hero2.jpg",
    text: "Still cross-referencing. Will post findings tonight.",
    timeAgo: "40 min ago",
  },

  {
    id: "msg4",
    channelId: "hinterkaifeck-think-tank-general",
    author: "ForensicPhil",
    avatar: "/image/hero2.jpg",
    text: "New scan of the case file is up in the evidence locker.",
    timeAgo: "3 hours ago",
  },
  {
    id: "msg5",
    channelId: "hinterkaifeck-think-tank-general",
    author: "Diego Red Tiger",
    avatar: "/image/bg1.jpeg",
    text: "Reviewing now, this changes the timeline significantly.",
    timeAgo: "2 hours ago",
  },
];

export const groupCategories = [
  "Missing Persons",
  "Regional",
  "Historic Cases",
  "Unexplained",
  "Cold Cases",
] as const;

export const getGroupById = (id: string) => groups.find((g) => g.id === id);

export const getChannelsByGroup = (groupId: string) =>
  channels.filter((c) => c.groupId === groupId);

export const getChannelById = (channelId: string) =>
  channels.find((c) => c.id === channelId);

export const getMembersByGroup = (groupId: string) =>
  groupMembers.filter((m) => m.groupId === groupId);

export const getMessagesByChannel = (channelId: string) =>
  channelMessages.filter((m) => m.channelId === channelId);

export const joinedGroups = groups.filter((g) => g.joined);
