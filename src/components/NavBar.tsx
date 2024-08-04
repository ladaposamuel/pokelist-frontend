import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/userContext";

export const NavBar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, deleteToken } = useAuth();

  const logoutUser = () => {
    deleteToken();
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-laravel">
      <div className="container">
        <Link to="/" className="navbar-brand">
          PokeList Organisation
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                {/* Links for authenticated users */}
                <li className="nav-item">
                  <Link
                    to="/dashboard"
                    className={`nav-link ${
                      location.pathname === "/dashboard" ? "active" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="" className="nav-link" onClick={logoutUser}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* Links for non-authenticated users */}
                <li className="nav-item">
                  <Link
                    to="/login"
                    className={`nav-link ${
                      location.pathname === "/login" ? "active" : ""
                    }`}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className={`nav-link ${
                      location.pathname === "/register" ? "active" : ""
                    }`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
