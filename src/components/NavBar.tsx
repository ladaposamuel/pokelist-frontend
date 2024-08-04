import React from "react";
import { Link, useLocation } from "react-router-dom";

export const NavBar: React.FC = () => {
  const location = useLocation();

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
          </ul>
        </div>
      </div>
    </nav>
  );
};
