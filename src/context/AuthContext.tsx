import { useContext, createContext } from 'react';

const authContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <authContext.Provider value={{}}>{children}</authContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(authContext);
};
