import React, {
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useNavigate } from "react-router";
import authApiService, { IAuthPostDto } from "../../Services/api/auth";
import { AuthContext } from "./authUtils";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const refreshToken = useCallback(() => {
    const reftoken = localStorage.getItem("reftoken");

    if (reftoken) {
      const updateToken = async () => {
        try {
          setLoading(true);
          const data = await authApiService.updateToken(reftoken);
          localStorage.setItem("token", data.access);
          localStorage.setItem("reftoken", data.refresh);
          setUser(data.access); // directly use the token from the API
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          console.error("Failed to refresh token:", errorMessage);
          navigate("/login");
        } finally {
          setLoading(false);
        }
      };

      updateToken();
    } else {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    refreshToken();

    // Cleanup
    return () => {};
  }, [refreshToken]);

  const login = async (credentials: IAuthPostDto): Promise<string | null> => {
    try {
      setLoading(true);
      const data = await authApiService.getToken(credentials);
      localStorage.setItem("token", data.access);
      localStorage.setItem("reftoken", data.refresh);
      setUser(data.access); // directly use the token from the API
      return data.access;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage || "Login failed");
      console.error("Failed to login:", errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("reftoken");
    setUser(null);
    navigate("/login");
  };

  return <AuthContext.Provider value={{ user, login, logout, loading, error, refreshToken }}>{children} </AuthContext.Provider>
  
};
