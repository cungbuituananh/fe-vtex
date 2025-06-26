import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface User {
  id: string;
  username: string;
  role: "admin" | "user";
  email?: string;
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
  console.log("user: ", user);
  const [isLoading, setIsLoading] = useState(true);

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
    if (username === "admin" && password === "admin") {
      const userData: User = {
        id: "1",
        username: "admin",
        role: "admin",
        email: "admin@example.com",
      };
      setUser(userData);
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("userData", JSON.stringify(userData));
      return true;
    } else if (username === "user" && password === "user") {
      const userData: User = {
        id: "2",
        username: "user",
        role: "user",
        email: "user@example.com",
      };
      setUser(userData);
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("userData", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userData");
  };

  const hasRole = (roles: string[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
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
