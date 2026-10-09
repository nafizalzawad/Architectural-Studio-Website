'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type HeaderTheme = 'white' | 'black';

interface NavigationContextType {
  // Navigation Drawer
  isOpen: boolean;
  toggleOpen: () => void;
  openMenu: () => void;
  closeMenu: () => void;

  // Global Quick Inquiry Slide-Over Modal
  isQuickContactOpen: boolean;
  openQuickContact: () => void;
  closeQuickContact: () => void;
  toggleQuickContact: () => void;

  // Dynamic Header Contrast Engine (data-header="white" | "black")
  headerTheme: HeaderTheme;
  setHeaderTheme: (theme: HeaderTheme) => void;

  // Active Project / Section Ticker (.project .case)
  activeProjectTicker: string;
  setActiveProjectTicker: (ticker: string) => void;

  // 2.5D Overview vs Fullscreen Slider Mode
  isOverviewMode: boolean;
  toggleOverviewMode: () => void;
  setOverviewMode: (mode: boolean) => void;

  // Active slide index across slider engine
  activeSlideIndex: number;
  setActiveSlideIndex: (index: number) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isQuickContactOpen, setIsQuickContactOpen] = useState<boolean>(false);
  const [headerTheme, setHeaderTheme] = useState<HeaderTheme>('white');
  const [activeProjectTicker, setActiveProjectTicker] = useState<string>('');
  const [isOverviewMode, setIsOverviewMode] = useState<boolean>(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const toggleQuickContact = () => setIsQuickContactOpen((prev) => !prev);
  const openQuickContact = () => setIsQuickContactOpen(true);
  const closeQuickContact = () => setIsQuickContactOpen(false);

  const toggleOverviewMode = () => setIsOverviewMode((prev) => !prev);
  const setOverviewMode = (mode: boolean) => setIsOverviewMode(mode);

  // Prevent background scrolling when either menu or quick inquiry drawer is open
  useEffect(() => {
    if (isOpen || isQuickContactOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isOpen) closeMenu();
        if (isQuickContactOpen) closeQuickContact();
        if (isOverviewMode) setIsOverviewMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isQuickContactOpen, isOverviewMode]);

  return (
    <NavigationContext.Provider
      value={{
        isOpen,
        toggleOpen,
        openMenu,
        closeMenu,
        isQuickContactOpen,
        openQuickContact,
        closeQuickContact,
        toggleQuickContact,
        headerTheme,
        setHeaderTheme,
        activeProjectTicker,
        setActiveProjectTicker,
        isOverviewMode,
        toggleOverviewMode,
        setOverviewMode,
        activeSlideIndex,
        setActiveSlideIndex,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
