import { createContext, useContext } from "react";

interface AuthContextType {
    user: string | null;
    login: (credentials: {
      username: string;
      password: string;
    }) => Promise<string | null>;
    logout: () => void;
    loading: boolean;
    error?: string;
    refreshToken: () => void;
  }
  

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
