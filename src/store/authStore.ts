// src/store/authStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: { email: string; phone?: string; firstName?: string; lastName?: string } | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string, phoneNumber: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  submitPhone: (phone: string) => Promise<void>;
  logout: () => Promise<void>;
}

const API_URL = 'https://yeme-dev-api.onrender.com'; // Your Render URL

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      const { accessToken, user } = data;
      if (!accessToken) throw new Error('No access token received');

      await AsyncStorage.setItem('token', accessToken);
      set({
        token: accessToken,
        user: user ? { email: user.email, phone: user.phone, firstName: user.firstName, lastName: user.lastName } : { email }, // Fallback to provided email
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  signup: async (fullName: string, email: string, password: string, phoneNumber: string) => {
    set({ isLoading: true, error: null });
    try {
      // Split fullName into firstName and lastName
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, phoneNumber }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Signup failed');

      const { user } = data;
      set({
        user: user ? {
          email: user.email || email,
          firstName: user.firstName || firstName,
          lastName: user.lastName || lastName,
          phone: user.phone || phoneNumber,
        } : { email, firstName, lastName, phone: phoneNumber }, // Fallback to provided values
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  verifyOtp: async (otp: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'OTP verification failed');

      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  submitPhone: async (phone: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/users/update-phone`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Phone submission failed');

      set((state) => ({
        user: state.user ? { ...state.user, phone } : null,
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
    set({ token: null, isAuthenticated: false, user: null, error: null });
  },
}));