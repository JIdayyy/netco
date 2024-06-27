import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const appContext = createContext<{
  isScrolled: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
} | null>(null);

function AppContextProvider({ children }: { children: ReactNode }) {
  const [appState, setAppState] = useState({
    isScrolled: false,
    isMenuOpen: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setAppState((state) => ({ ...state, isScrolled: true }));
      } else {
        setAppState((state) => ({ ...state, isScrolled: false }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setAppState((state) => ({ ...state, isMenuOpen: !state.isMenuOpen }));
  };

  return (
    <appContext.Provider
      value={{
        ...appState,
        toggleMenu,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

const useAppContext = () => {
  const context = useContext(appContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }

  return context;
};

export { AppContextProvider, useAppContext };
