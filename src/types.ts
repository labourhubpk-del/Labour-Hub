export type TradeCategory =
  | 'Electrician'
  | 'Plumber'
  | 'Mechanic'
  | 'Construction'
  | 'Woodwork'
  | 'Painter'
  | 'Driver'
  | 'Security Guard'
  | 'AC & Appliances'
  | 'Deep Cleaning'
  | 'Digital & Other';

export type PakistanCity =
  | 'All Pakistan'
  | 'Lahore'
  | 'Karachi'
  | 'Islamabad'
  | 'Rawalpindi'
  | 'Faisalabad'
  | 'Multan'
  | 'Peshawar'
  | 'Quetta'
  | 'Gujranwala'
  | 'Sialkot';

export type UserRole = 'employer' | 'helper';

export interface Bid {
  id: string;
  taskId: string;
  orderNumber?: string;
  workerName: string;
  workerAvatar: string;
  workerTrade: TradeCategory;
  isCNICVerified: boolean;
  isPro: boolean;
  rating: number;
  completedJobs: number;
  amountPKR: number;
  estimatedHours: string;
  proposal: string;
  hasOwnTools: boolean;
  workerPhone?: string;
  skillStars: number; // 1 to 5 stars declared by labour for how professional they are for this work
  workerRemarks?: string; // Labour remarks / review
  workerRatingForEmployer?: number; // Stars for employer
  createdAt: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface Task {
  id: string;
  orderNumber: string; // e.g. "LH-101"
  title: string;
  urduTitle: string;
  category: TradeCategory;
  city: PakistanCity;
  area: string;
  description: string;
  budgetPKR: number;
  isFixedBudget: boolean;
  isFeatured: boolean;
  urgency: 'Urgent (Aaj hi)' | '24 Ghante me' | 'Is haftay';
  postedBy: string;
  postedByPhone?: string;
  postedByCnic?: string;
  postedAt: string;
  status: 'open' | 'assigned' | 'completed';
  bids: Bid[];
  acceptedBidId?: string;
  image?: string;
  // Mutual remarks & stars for both Employer and Worker
  employerRemarks?: string;
  employerRating?: number; // 1 to 5 stars given by employer to worker
  workerRemarks?: string;
  workerRating?: number; // 1 to 5 stars given by worker to employer
  completionDate?: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  city: PakistanCity;
  role: UserRole;
  isCNICVerified: boolean;
  cnicNumber?: string;
  selfieImage?: string;
  isPro: boolean;
  startingProFree: boolean; // Launch offer: Starting Pro Free for everyone with quota limit
  proFreeBidsLeft: number;  // Remaining free Pro bids (e.g. 30)
  proFreeLimit: number;     // Total free limit (30)
  proExpiry?: string;
  walletBalancePKR: number;
  streakDays: number;
  completedJobsCount: number;
  rating: number;
}
