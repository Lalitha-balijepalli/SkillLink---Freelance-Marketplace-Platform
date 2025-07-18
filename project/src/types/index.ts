export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'freelancer';
  avatar?: string;
  bio?: string;
  skills?: string[];
  hourlyRate?: number;
  rating?: number;
  completedJobs?: number;
  joinedDate: string;
  portfolio?: PortfolioItem[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  budgetType: 'fixed' | 'hourly';
  deadline: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  postedBy: string;
  clientName: string;
  skills: string[];
  createdAt: string;
  bids?: Bid[];
  bidCount?: number;
}

export interface Bid {
  id: string;
  jobId: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar?: string;
  bidAmount: number;
  proposalText: string;
  deliveryTime: number;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Contract {
  id: string;
  jobId: string;
  freelancerId: string;
  clientId: string;
  status: 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  amount: number;
}