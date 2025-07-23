import { loginAPI, logoutAPI } from "@/services/apis/auth";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

export interface User {
  id: string;
  username: string;
  roles: string[];
  role: string; // Assuming role is a single string, not an array
  email?: string;
  firstName?: string;
  lastName?: string;
  language?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuthStatus = () => {
      const isLogin = localStorage.getItem("isLogin");
      const userData = localStorage.getItem("userData");

      if (Boolean(isLogin) && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error("Failed to parse user data:", error);
          localStorage.removeItem("isLogin");
          localStorage.removeItem("userData");
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    // Simulate API call
    const { data } = await loginAPI({ username, password });

    if (data) {
      setUser(data);
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("userData", JSON.stringify(data));
      localStorage.setItem("accessToken", data.accessToken || "");
      return true;
    }

    return false;
  };

  const logout = async () => {
    const { data } = await logoutAPI();
    console.log("data: ", data);
    setUser(null);
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const hasRole = (roles: string[]): boolean => {
    if (!user) return false;
    return roles.some((role) => user.roles.includes(role));
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
