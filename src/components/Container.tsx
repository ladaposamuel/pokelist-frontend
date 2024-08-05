import React from "react";

import { NavBar } from "./NavBar";

import { useAuth } from "../context/userContext";
import AppRoutes from "./AppRoutes";

export const AppContainer: React.FC = () => {
  const { isAuthenticated } = useAuth();



  return (
    <>
      <NavBar />
      <main className="login-form">
        <div className="cotainer">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <AppRoutes
                isAuthenticated={isAuthenticated}
              
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
