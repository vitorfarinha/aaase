export interface Alumni {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  role: string;
  company: string;
  industry: string;
  city: string;
  country: string;
  graduationYear: number;
  bio: string;
  interests: string[];
  skills: string[];
  trustScore: number;
  profileCompleteness: number;
  isVerified: boolean;
  isMentor: boolean;
  isFounder: boolean;
  mutualConnections?: string[];
  whyRelevant?: string;
  connectionStrength?: "close" | "warm" | "distant";
  groups: string[];
  languages: string[];
}

export interface AlumniBusiness {
  id: string;
  name: string;
  founder: string;
  founderId: string;
  category: string;
  description: string;
  city: string;
  country: string;
  logo: string;
  foundedYear: number;
  endorsements: number;
  rating: number;
  reviewCount: number;
  communityPerk: string;
  trustBadge: boolean;
  featuredReview: string;
  reviewerName: string;
  tags: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  type: "job" | "consulting" | "mentoring" | "speaking" | "investment" | "volunteer" | "collaboration";
  company: string;
  postedBy: string;
  posterId: string;
  city: string;
  country: string;
  description: string;
  relevanceScore: number;
  whyMatched: string;
  mutualConnections: string[];
  deadline?: string;
  compensation?: string;
  tags: string[];
}

export interface Reward {
  id: string;
  title: string;
  partner: string;
  category: string;
  description: string;
  benefit: string;
  code?: string;
  validUntil?: string;
  isExclusive: boolean;
  isMostLoved: boolean;
  redemptionCount: number;
  emoji: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  emoji: string;
  memberCount: number;
  category: string;
  isPrivate: boolean;
  recentActivity: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: "networking" | "dinner" | "talk" | "webinar" | "reunion" | "workshop";
  date: string;
  time: string;
  location: string;
  city: string;
  isVirtual: boolean;
  attendeeCount: number;
  capacity: number;
  organizer: string;
  tags: string[];
  price?: string;
}

export interface Notification {
  id: string;
  type: "intro" | "connection" | "opportunity" | "event" | "reward" | "message";
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  firstName: string;
  avatar: string;
  initials: string;
  role: string;
  company: string;
  industry: string;
  city: string;
  graduationYear: number;
  trustScore: number;
  memberSince: string;
  memberNumber: string;
  profileCompleteness: number;
  isVerified: boolean;
  isMentor: boolean;
  bio: string;
  interests: string[];
  groups: string[];
}
