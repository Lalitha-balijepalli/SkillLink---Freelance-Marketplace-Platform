import { create } from 'zustand';
import { Job, Bid } from '../types';

interface JobState {
  jobs: Job[];
  userJobs: Job[];
  userBids: Bid[];
  searchQuery: string;
  selectedSkills: string[];
  budgetRange: [number, number];
  
  setJobs: (jobs: Job[]) => void;
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'bidCount'>) => void;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
  deleteJob: (jobId: string) => void;
  submitBid: (bid: Omit<Bid, 'id' | 'createdAt'>) => void;
  setSearchQuery: (query: string) => void;
  setSelectedSkills: (skills: string[]) => void;
  setBudgetRange: (range: [number, number]) => void;
  getFilteredJobs: () => Job[];
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Build a React E-commerce Website',
    description: 'I need a modern e-commerce website built with React and Node.js. The website should include product catalog, shopping cart, user authentication, and payment integration.',
    budget: 2500,
    budgetType: 'fixed',
    deadline: '2024-03-15',
    status: 'open',
    postedBy: '1',
    clientName: 'John Client',
    skills: ['React', 'Node.js', 'MongoDB', 'Payment Integration'],
    createdAt: '2024-01-10',
    bidCount: 12
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    description: 'Design a modern mobile app interface for a fitness tracking application. Need wireframes, mockups, and interactive prototypes.',
    budget: 65,
    budgetType: 'hourly',
    deadline: '2024-02-28',
    status: 'open',
    postedBy: '1',
    clientName: 'John Client',
    skills: ['UI/UX Design', 'Figma', 'Mobile Design'],
    createdAt: '2024-01-08',
    bidCount: 8
  },
  {
    id: '3',
    title: 'WordPress Blog Setup',
    description: 'Set up a professional WordPress blog with custom theme, plugins, and SEO optimization. Need it completed within 1 week.',
    budget: 800,
    budgetType: 'fixed',
    deadline: '2024-02-20',
    status: 'open',
    postedBy: '1',
    clientName: 'John Client',
    skills: ['WordPress', 'PHP', 'SEO'],
    createdAt: '2024-01-05',
    bidCount: 15
  }
];

export const useJobStore = create<JobState>((set, get) => ({
  jobs: mockJobs,
  userJobs: [],
  userBids: [],
  searchQuery: '',
  selectedSkills: [],
  budgetRange: [0, 10000],
  
  setJobs: (jobs) => set({ jobs }),
  
  addJob: (jobData) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      bidCount: 0
    };
    set(state => ({ jobs: [newJob, ...state.jobs] }));
  },
  
  updateJob: (jobId, updates) => {
    set(state => ({
      jobs: state.jobs.map(job => 
        job.id === jobId ? { ...job, ...updates } : job
      )
    }));
  },
  
  deleteJob: (jobId) => {
    set(state => ({
      jobs: state.jobs.filter(job => job.id !== jobId)
    }));
  },
  
  submitBid: (bidData) => {
    const newBid: Bid = {
      ...bidData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    set(state => ({
      userBids: [...state.userBids, newBid],
      jobs: state.jobs.map(job => 
        job.id === bidData.jobId 
          ? { ...job, bidCount: (job.bidCount || 0) + 1 }
          : job
      )
    }));
  },
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedSkills: (skills) => set({ selectedSkills: skills }),
  setBudgetRange: (range) => set({ budgetRange: range }),
  
  getFilteredJobs: () => {
    const { jobs, searchQuery, selectedSkills, budgetRange } = get();
    
    return jobs.filter(job => {
      const matchesSearch = !searchQuery || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSkills = selectedSkills.length === 0 ||
        selectedSkills.some(skill => job.skills.includes(skill));
      
      const matchesBudget = job.budget >= budgetRange[0] && job.budget <= budgetRange[1];
      
      return matchesSearch && matchesSkills && matchesBudget;
    });
  }
}));