import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";

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
    // Check if the user is authenticated on component mount
    const token = localStorage.getItem("pokelist-token");
    setIsAuthenticated(!!token);

    // Load the current user from localStorage on mount
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
    setCurrentUser(null); // Reset currentUser when token is deleted
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
