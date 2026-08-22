import React, { createContext, useContext, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

const DEFAULT_DEMO_USER = {
  id: 'usr_ari_01',
  fullName: 'Arjun Singhania',
  email: 'arjun.singhania@example.com',
  phone: '+91 98100 12345',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  memberSince: 'October 2024',
  tier: 'Ari Insider (Tier 1)',
  addresses: [
    {
      id: 'addr_1',
      isDefault: true,
      fullName: 'Arjun Singhania',
      phone: '+91 98100 12345',
      address: 'Villa 14, The Magnolia Enclave, Golf Course Road',
      apartment: 'Phase 5',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
    },
    {
      id: 'addr_2',
      isDefault: false,
      fullName: 'Arjun Singhania',
      phone: '+91 98100 12345',
      address: 'Floor 4, Maker Chambers III, Nariman Point',
      apartment: 'Office Suite 402',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400021',
    },
  ],
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('ari_styles_user', DEFAULT_DEMO_USER);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const { showSuccess, showInfo } = useToast();

  const login = useCallback((credentials) => {
    // Simulated authentication layer
    const loggedInUser = {
      ...DEFAULT_DEMO_USER,
      email: credentials.email || DEFAULT_DEMO_USER.email,
      fullName: credentials.fullName || DEFAULT_DEMO_USER.fullName,
    };
    setUser(loggedInUser);
    setIsAuthModalOpen(false);
    showSuccess(`Welcome back, ${loggedInUser.fullName}!`);
  }, [setUser, showSuccess]);

  const logout = useCallback(() => {
    setUser(null);
    showInfo('You have been signed out.');
  }, [setUser, showInfo]);

  const updateProfile = useCallback((profileData) => {
    setUser((prev) => ({
      ...prev,
      ...profileData,
    }));
    showSuccess('Profile details updated successfully');
  }, [setUser, showSuccess]);

  const addAddress = useCallback((addressData) => {
    const newAddress = {
      id: `addr_${Date.now()}`,
      isDefault: addressData.isDefault || false,
      ...addressData,
    };

    setUser((prev) => {
      const addresses = prev?.addresses ? [...prev.addresses] : [];
      if (newAddress.isDefault) {
        addresses.forEach((a) => (a.isDefault = false));
      }
      return {
        ...prev,
        addresses: [newAddress, ...addresses],
      };
    });
    showSuccess('New delivery address saved');
  }, [setUser, showSuccess]);

  const removeAddress = useCallback((addressId) => {
    setUser((prev) => ({
      ...prev,
      addresses: (prev?.addresses || []).filter((a) => a.id !== addressId),
    }));
    showInfo('Address removed');
  }, [setUser, showInfo]);

  const openAuthModal = useCallback((mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isAuthModalOpen,
    authMode,
    openAuthModal,
    closeAuthModal,
    setAuthMode,
    login,
    logout,
    updateProfile,
    addAddress,
    removeAddress,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
