import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  
  const [selectedDomain, setSelectedDomain] = useState(() => {
    return localStorage.getItem('selectedDomain') || null;
  });
  
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('progress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (selectedDomain) {
      localStorage.setItem('selectedDomain', selectedDomain);
    } else {
      localStorage.removeItem('selectedDomain');
    }
  }, [selectedDomain]);

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const markTopicComplete = (topicId) => {
    setProgress(prev => ({ ...prev, [topicId]: true }));
  };
  
  const resetProgress = () => {
    setProgress({});
    setSelectedDomain(null);
  }

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      selectedDomain,
      setSelectedDomain,
      progress,
      markTopicComplete,
      resetProgress
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
