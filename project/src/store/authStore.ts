import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'client' | 'freelancer') => Promise<void>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'joinedDate'>) => Promise<void>;
  updateProfile: (updates: Partial<User>) => void;
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Client',
    email: 'john@example.com',
    role: 'client',
    joinedDate: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah Developer',
    email: 'sarah@example.com',
    role: 'freelancer',
    bio: 'Full-stack developer with 5+ years experience',
    skills: ['React', 'Node.js', 'Python', 'MongoDB'],
    hourlyRate: 45,
    rating: 4.9,
    completedJobs: 127,
    joinedDate: '2023-08-22',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    portfolio: [
      {
        id: '1',
        title: 'E-commerce Platform',
        description: 'Built a full-stack e-commerce platform with React and Node.js',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'
      }
    ]
  }
];

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string, role: 'client' | 'freelancer') => {
    // Mock login - in real app, this would call an API
    const user = mockUsers.find(u => u.email === email && u.role === role);
    if (user) {
      set({ user, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  register: async (userData) => {
    // Mock registration
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      joinedDate: new Date().toISOString().split('T')[0]
    };
    mockUsers.push(newUser);
    set({ user: newUser, isAuthenticated: true });
  },
  
  updateProfile: (updates) => {
    const { user } = get();
    if (user) {
      const updatedUser = { ...user, ...updates };
      set({ user: updatedUser });
    }
  }
}));