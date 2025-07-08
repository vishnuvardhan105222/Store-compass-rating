import { User, Store, Rating, LoginRequest, RegisterRequest, UserRole, DashboardStats } from '@/types';

// Mock data storage
const STORAGE_KEYS = {
  USERS: 'ratinity_users',
  STORES: 'ratinity_stores',
  RATINGS: 'ratinity_ratings',
};

// Initial seed data
const seedUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@ratinity.com',
    address: '123 Admin Street, Admin City, AC 12345',
    role: 'ADMIN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    address: '456 User Street, User City, UC 67890',
    role: 'NORMAL_USER',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Store Manager',
    email: 'manager@store.com',
    address: '789 Store Avenue, Store City, SC 11111',
    role: 'STORE_OWNER',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const seedStores: Store[] = [
  {
    id: '1',
    name: 'Tech Paradise',
    email: 'contact@techparadise.com',
    address: '100 Tech Street, Silicon Valley, CA 94000',
    ownerId: '3',
    averageRating: 4.2,
    totalRatings: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Food Central',
    email: 'info@foodcentral.com',
    address: '200 Food Boulevard, Foodie Town, FT 12345',
    averageRating: 3.8,
    totalRatings: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Fashion Hub',
    email: 'contact@fashionhub.com',
    address: '300 Style Street, Fashion District, FD 56789',
    averageRating: 4.7,
    totalRatings: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const seedRatings: Rating[] = [
  {
    id: '1',
    userId: '2',
    storeId: '1',
    rating: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: '2',
    storeId: '2',
    rating: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock passwords (in real app, these would be hashed)
const mockPasswords: Record<string, string> = {
  'admin@ratinity.com': 'Admin123!',
  'john@example.com': 'User123!',
  'manager@store.com': 'Manager123!',
};

// Utility functions
const getStoredData = <T>(key: string, defaultData: T[]): T[] => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultData;
  } catch {
    return defaultData;
  }
};

const setStoredData = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Initialize data if not exists
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    setStoredData(STORAGE_KEYS.USERS, seedUsers);
  }
  if (!localStorage.getItem(STORAGE_KEYS.STORES)) {
    setStoredData(STORAGE_KEYS.STORES, seedStores);
  }
  if (!localStorage.getItem(STORAGE_KEYS.RATINGS)) {
    setStoredData(STORAGE_KEYS.RATINGS, seedRatings);
  }
};

// API simulation functions
export const mockAuth = {
  login: async (credentials: LoginRequest): Promise<{ success: boolean; user?: User; token?: string; error?: string }> => {
    initializeData();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = getStoredData<User>(STORAGE_KEYS.USERS, seedUsers);
    const user = users.find(u => u.email === credentials.email);
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    const expectedPassword = mockPasswords[credentials.email];
    if (credentials.password !== expectedPassword) {
      return { success: false, error: 'Invalid password' };
    }
    
    const token = `mock_token_${user.id}_${Date.now()}`;
    return { success: true, user, token };
  },

  register: async (userData: RegisterRequest): Promise<{ success: boolean; user?: User; token?: string; error?: string }> => {
    initializeData();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = getStoredData<User>(STORAGE_KEYS.USERS, seedUsers);
    
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'Email already exists' };
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      address: userData.address,
      role: 'NORMAL_USER',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedUsers = [...users, newUser];
    setStoredData(STORAGE_KEYS.USERS, updatedUsers);
    mockPasswords[userData.email] = userData.password;
    
    const token = `mock_token_${newUser.id}_${Date.now()}`;
    return { success: true, user: newUser, token };
  },

  updatePassword: async (userId: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = getStoredData<User>(STORAGE_KEYS.USERS, seedUsers);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    const expectedPassword = mockPasswords[user.email];
    if (currentPassword !== expectedPassword) {
      return { success: false, error: 'Current password is incorrect' };
    }
    
    mockPasswords[user.email] = newPassword;
    return { success: true };
  },
};

export const mockApi = {
  // Users
  getUsers: async (): Promise<User[]> => {
    initializeData();
    await new Promise(resolve => setTimeout(resolve, 300));
    return getStoredData<User>(STORAGE_KEYS.USERS, seedUsers);
  },

  createUser: async (userData: any): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = getStoredData<User>(STORAGE_KEYS.USERS, seedUsers);
    
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedUsers = [...users, newUser];
    setStoredData(STORAGE_KEYS.USERS, updatedUsers);
    mockPasswords[userData.email] = userData.password;
    
    return newUser;
  },

  // Stores
  getStores: async (): Promise<Store[]> => {
    initializeData();
    await new Promise(resolve => setTimeout(resolve, 300));
    return getStoredData<Store>(STORAGE_KEYS.STORES, seedStores);
  },

  createStore: async (storeData: any): Promise<Store> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const stores = getStoredData<Store>(STORAGE_KEYS.STORES, seedStores);
    
    const newStore: Store = {
      id: Date.now().toString(),
      ...storeData,
      averageRating: 0,
      totalRatings: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedStores = [...stores, newStore];
    setStoredData(STORAGE_KEYS.STORES, updatedStores);
    
    return newStore;
  },

  // Ratings
  getRatings: async (): Promise<Rating[]> => {
    initializeData();
    await new Promise(resolve => setTimeout(resolve, 300));
    return getStoredData<Rating>(STORAGE_KEYS.RATINGS, seedRatings);
  },

  getUserRatings: async (userId: string): Promise<Rating[]> => {
    const ratings = await mockApi.getRatings();
    return ratings.filter(r => r.userId === userId);
  },

  getStoreRatings: async (storeId: string): Promise<Rating[]> => {
    const ratings = await mockApi.getRatings();
    const users = await mockApi.getUsers();
    
    const storeRatings = ratings.filter(r => r.storeId === storeId);
    return storeRatings.map(rating => ({
      ...rating,
      user: users.find(u => u.id === rating.userId),
    }));
  },

  submitRating: async (userId: string, storeId: string, rating: number): Promise<Rating> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const ratings = getStoredData<Rating>(STORAGE_KEYS.RATINGS, seedRatings);
    const stores = getStoredData<Store>(STORAGE_KEYS.STORES, seedStores);
    
    // Check if user already rated this store
    const existingRatingIndex = ratings.findIndex(r => r.userId === userId && r.storeId === storeId);
    
    let newRating: Rating;
    
    if (existingRatingIndex !== -1) {
      // Update existing rating
      newRating = {
        ...ratings[existingRatingIndex],
        rating,
        updatedAt: new Date().toISOString(),
      };
      ratings[existingRatingIndex] = newRating;
    } else {
      // Create new rating
      newRating = {
        id: Date.now().toString(),
        userId,
        storeId,
        rating,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      ratings.push(newRating);
    }
    
    // Update store's average rating
    const storeRatings = ratings.filter(r => r.storeId === storeId);
    const averageRating = storeRatings.reduce((sum, r) => sum + r.rating, 0) / storeRatings.length;
    
    const storeIndex = stores.findIndex(s => s.id === storeId);
    if (storeIndex !== -1) {
      stores[storeIndex] = {
        ...stores[storeIndex],
        averageRating: Math.round(averageRating * 10) / 10,
        totalRatings: storeRatings.length,
        updatedAt: new Date().toISOString(),
      };
      setStoredData(STORAGE_KEYS.STORES, stores);
    }
    
    setStoredData(STORAGE_KEYS.RATINGS, ratings);
    return newRating;
  },

  // Dashboard stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    const [users, stores, ratings] = await Promise.all([
      mockApi.getUsers(),
      mockApi.getStores(),
      mockApi.getRatings(),
    ]);
    
    return {
      totalUsers: users.length,
      totalStores: stores.length,
      totalRatings: ratings.length,
    };
  },
};