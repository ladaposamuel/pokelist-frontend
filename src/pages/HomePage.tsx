import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/userContext";

export const HomePage: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Welcome</h3>
      </div>
      <div className="card-body">
        <p>
          Welcome to the secret fan PokeList Organisation, a platform that
          allows you to privately vote on your favourite Pokemon. <br />
          Get started by creating an account or logging in.
        </p>
        <hr />

        {isAuthenticated && currentUser ? (
          <div>
            <h4>Hello, {currentUser?.name}</h4>
            <p>You are currently logged in.</p>
            You can now <Link to="/dashboard">view your dashboard</Link>
          </div>
        ) : (
          <div className="mb-2">
            <Link className="btn btn-primary btn-lg" to="/register">
              Create an account
            </Link>{" "}
            <Link className="btn btn-secondary btn-lg" to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
