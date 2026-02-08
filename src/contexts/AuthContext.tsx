import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FarmerProfile {
  name: string;
  farmLocation: string;
  crop: string;
  cropStartDate: string;
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  profile: FarmerProfile;
  login: (email: string, password: string) => boolean;
  signup: (data: FarmerProfile & { password: string }) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<FarmerProfile>) => void;
}

const defaultProfile: FarmerProfile = {
  name: 'Rajesh Kumar',
  farmLocation: 'Nashik, Maharashtra',
  crop: 'Wheat',
  cropStartDate: '2025-11-15',
  email: 'rajesh@farm.com',
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('irrigation_auth') === 'true';
  });
  const [profile, setProfile] = useState<FarmerProfile>(() => {
    const saved = localStorage.getItem('irrigation_profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const login = (email: string, _password: string) => {
    setIsLoggedIn(true);
    localStorage.setItem('irrigation_auth', 'true');
    if (!localStorage.getItem('irrigation_profile')) {
      localStorage.setItem('irrigation_profile', JSON.stringify({ ...defaultProfile, email }));
      setProfile({ ...defaultProfile, email });
    }
    return true;
  };

  const signup = (data: FarmerProfile & { password: string }) => {
    const { password, ...profileData } = data;
    setProfile(profileData);
    setIsLoggedIn(true);
    localStorage.setItem('irrigation_auth', 'true');
    localStorage.setItem('irrigation_profile', JSON.stringify(profileData));
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('irrigation_auth');
  };

  const updateProfile = (data: Partial<FarmerProfile>) => {
    const updated = { ...profile, ...data };
    setProfile(updated);
    localStorage.setItem('irrigation_profile', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, profile, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
