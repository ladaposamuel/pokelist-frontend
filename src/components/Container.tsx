import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { NavBar } from "./NavBar";
import PrivateRoute from "../utils/PrivateRoute";
import DashboardPage from "../pages/DashboardPage";

import ShowToast from "./ShowToast";

export const AppContainer: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    title: "",
    message: "",
    type: "",
  });

  const showToastHandler = (title: string, message: string, type: string) => {
    setToastConfig({ title, message, type });
    setShowToast(true);
  };

  const hideToastHandler = () => {
    setShowToast(false);
  };

  return (
    <>
      <NavBar />

      <main className="login-form">
        <div className="cotainer">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/login"
                  element={<LoginPage showToast={showToastHandler} />}
                />
                <Route
                  path="/register"
                  element={<RegisterPage showToast={showToastHandler} />}
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </main>
      {showToast && (
        <ShowToast
          title={toastConfig.title}
          message={toastConfig.message}
          type={toastConfig.type as any}
          autohide={true}
          delay={3000}
          onClose={hideToastHandler as any}
        />
      )}
    </>
  );
};
