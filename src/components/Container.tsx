import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { NavBar } from "./NavBar";
export const AppContainer: React.FC = () => {
  return (
    <>
      <NavBar />

      <main className="login-form">
        <div className="cotainer">
          <div className="row justify-content-center">
            <div className="col-md-8">
      
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
            
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
