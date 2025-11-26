import { useContext, createContext } from 'react';
import type { AuthContextType } from '../types/AuthTypes';

const AuthContext = createContext<AuthContextType | null>(
  null
);

export const AuthProvider = ({
  children,
  user,
}: AuthContextType) => {
  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthProvider'
    );
  }
  return context;
};
