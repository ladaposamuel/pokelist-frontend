import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/userContext";
import { apiClient } from "../utils/apiClient";
import Badge from "react-bootstrap/Badge";

export const HomePage: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const [pingBackend, setPingBackend] = useState<boolean | string>(false);

  const pingBackendServer = async () => {
    setPingBackend("checking");
    try {
      const response = await apiClient.get("");
      setPingBackend(response.success);
    } catch (error) {
      setPingBackend(false);
    }
  };

  useEffect(() => {
    setPingBackend("checking");
    const interval = setInterval(pingBackendServer, 5000);
    return () => clearInterval(interval);
  }, []);

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
            <p>You are currently logged in & have access to your dashboard.</p>
            <p>
              You are currently in the <b>{currentUser?.organisation?.name}</b>{" "}
              organisation.
            </p>
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
        <div className="mt-4">
          API status:{" "}
          {pingBackend !== "checking" ? (
            pingBackend ? (
              <Badge bg="success">Online</Badge>
            ) : (
              <Badge bg="danger">Offline</Badge>
            )
          ) : (
            <Badge bg="warning" text="dark">
              Checking...
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};
