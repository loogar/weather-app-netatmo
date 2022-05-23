import { createContext, useContext, useState } from 'react';

const ShowStatsContext = createContext({
  showStats: false,
  setShowStats: null,
});

export const ShowStatsProvider = ({ children }) => {
  const [showStats, setShowStats] = useState(false);
  const value = { showStats, setShowStats };
  return (
    <ShowStatsContext.Provider value={value}>
      {children}
    </ShowStatsContext.Provider>
  );
};

export const useShowStats = () => {
  const context = useContext(ShowStatsContext);
  if (!context) {
    throw new Error('useShowStats must be used within ShowStatsProvider');
  }
  return context;
};
