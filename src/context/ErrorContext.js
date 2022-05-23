import { createContext, useContext, useState } from 'react';

const ErrorContext = createContext({
  errorCode: 0,
  setError: null,
});

export const ErrorProvider = ({ children }) => {
  const [errorCode, setErrorCode] = useState(0);
  const value = { errorCode, setErrorCode };
  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};

export const useErrorCode = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorCode must be used within ErrorProvider');
  }
  return context;
};
