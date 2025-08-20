
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { Language, AdminProfile } from '../types';
import * as db from '../services/db';
import { TRANSLATIONS } from '../constants';

interface AppContextType {
  isLoggedIn: boolean;
  userProfile: AdminProfile | null;
  language: Language;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setLanguage: (lang: Language) => void;
  updateProfile: (profile: AdminProfile) => Promise<void>;
  t: (key: string) => string;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<AdminProfile | null>(null);
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  const t = useCallback((key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  }, [language]);

  const loadInitialData = async () => {
    try {
      const profile = await db.getAdminProfile();
      if (profile) {
        setUserProfile(profile);
        setLanguageState(profile.preferredLanguage);
      }
      // Check session storage for login status
      const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
      if (loggedIn && profile) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Failed to load initial data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const profile = await db.getAdminProfile();
    if (profile && profile.username === username && profile.password === password) {
      setIsLoggedIn(true);
      setUserProfile(profile);
      setLanguageState(profile.preferredLanguage);
      sessionStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    sessionStorage.removeItem('isLoggedIn');
  };

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    if (userProfile) {
      const updatedProfile = { ...userProfile, preferredLanguage: lang };
      await db.updateAdminProfile(updatedProfile);
      setUserProfile(updatedProfile);
    }
  };

  const updateProfile = async (profile: AdminProfile) => {
    await db.updateAdminProfile(profile);
    setUserProfile(profile);
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, userProfile, language, isLoading, login, logout, setLanguage, updateProfile, t }}>
      {children}
    </AppContext.Provider>
  );
};
