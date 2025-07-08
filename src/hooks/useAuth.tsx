import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState, LoginRequest, RegisterRequest } from '@/types';
import { mockAuth } from '@/lib/mockData';
import { toast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Check for stored authentication
    const storedToken = localStorage.getItem('ratinity_token');
    const storedUser = localStorage.getItem('ratinity_user');
    
    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          token: storedToken,
          isAuthenticated: true,
        });
      } catch (error) {
        localStorage.removeItem('ratinity_token');
        localStorage.removeItem('ratinity_user');
      }
    }
  }, []);

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      const result = await mockAuth.login(credentials);
      if (result.success && result.user && result.token) {
        const authData = {
          user: result.user,
          token: result.token,
          isAuthenticated: true,
        };
        
        setAuthState(authData);
        localStorage.setItem('ratinity_token', result.token);
        localStorage.setItem('ratinity_user', JSON.stringify(result.user));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${result.user.name}!`,
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: result.error || "Invalid credentials",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred during login",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (userData: RegisterRequest): Promise<boolean> => {
    try {
      const result = await mockAuth.register(userData);
      if (result.success && result.user && result.token) {
        const authData = {
          user: result.user,
          token: result.token,
          isAuthenticated: true,
        };
        
        setAuthState(authData);
        localStorage.setItem('ratinity_token', result.token);
        localStorage.setItem('ratinity_user', JSON.stringify(result.user));
        
        toast({
          title: "Registration successful",
          description: `Welcome to RATINITY, ${result.user.name}!`,
        });
        
        return true;
      } else {
        toast({
          title: "Registration failed",
          description: result.error || "Failed to create account",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Registration error",
        description: "An error occurred during registration",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    localStorage.removeItem('ratinity_token');
    localStorage.removeItem('ratinity_user');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      const result = await mockAuth.updatePassword(authState.user?.id || '', currentPassword, newPassword);
      if (result.success) {
        toast({
          title: "Password updated",
          description: "Your password has been successfully updated",
        });
        return true;
      } else {
        toast({
          title: "Password update failed",
          description: result.error || "Failed to update password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Password update error",
        description: "An error occurred while updating password",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      updatePassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};