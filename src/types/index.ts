export type UserRole = 'ADMIN' | 'NORMAL_USER' | 'STORE_OWNER';

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  id: string;
  name: string;
  email: string;
  address: string;
  ownerId?: string;
  averageRating: number;
  totalRatings: number;
  createdAt: string;
  updatedAt: string;
}

export interface Rating {
  id: string;
  userId: string;
  storeId: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  store?: Store;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  address: string;
}

export interface CreateStoreRequest {
  name: string;
  email: string;
  address: string;
  ownerEmail?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  role: UserRole;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface SubmitRatingRequest {
  storeId: string;
  rating: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}