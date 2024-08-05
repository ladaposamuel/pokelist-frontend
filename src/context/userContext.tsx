import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
  isAuthenticated: boolean;
  saveToken: (token: string) => void;
  deleteToken: () => void;
  keepUserLoggedIn: (user: User) => void;
  currentUser: User | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("pokelist-token");
    setIsAuthenticated(!!token);

    if (isTokenExpired()) {
      deleteToken();
    }

    const currentUserString = localStorage.getItem("pokelist-current-user");
    if (currentUserString) {
      setCurrentUser(JSON.parse(currentUserString));
    }
  }, []);

  const saveToken = (token: string) => {
    localStorage.setItem("pokelist-token", token);
    setIsAuthenticated(true);
  };

  const deleteToken = () => {
    localStorage.removeItem("pokelist-token");
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const isTokenExpired = () => {
    const token = localStorage.getItem("pokelist-token");
    if (!token) {
      return true;
    }
    try {
      const decodedToken = jwtDecode(token);

      if (typeof decodedToken === "object" && decodedToken.exp !== undefined) {
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  const keepUserLoggedIn = (user: User) => {
    localStorage.setItem("pokelist-current-user", JSON.stringify(user));
    setCurrentUser(user);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        saveToken,
        deleteToken,
        keepUserLoggedIn,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
