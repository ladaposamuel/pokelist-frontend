import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { User } from "../types";
import { useUser } from "../api";
import { useAuth } from "../context/userContext";

const LoginForm = ({ showToast }: { showToast: Function }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { loginUser } = useUser();
  const { saveToken, keepUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError({
      email: !state.email,
      password: !state.password,
    });

    const isValid = state.email && state.password;

    if (isValid) {
      try {
        const loggedinUser = await loginUser({
          email: state.email,
          password: state.password,
        } as User);
        if (typeof loggedinUser === "object" && loggedinUser.token) {
          setIsLoading(false);
          showToast("Success", "Login successful!", "success");
          saveToken(loggedinUser.token);
          keepUserLoggedIn(loggedinUser);
          navigate("/dashboard");
        } else {
          setIsLoading(false);
          showToast("Error", "Invalid response from server", "warning");
        }
      } catch (error: any) {
        setIsLoading(false);
        showToast("Error", error?.message || "An error occurred", "warning");
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Form>
      <Form.Group as={Row} className="form-group">
        <Form.Label>E-Mail Address</Form.Label>
        <Col md={6}>
          <Form.Control
            type="text"
            id="email"
            value={state.email}
            required
            autoFocus
            isInvalid={error.email}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="form-group mt-4">
        <Form.Label>Password</Form.Label>
        <Col md={6}>
          <Form.Control
            type="password"
            id="password"
            value={state.password}
            required
            isInvalid={error.password}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      <Row className="mt-4">
        <Col>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            onClick={handleSubmitClick}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-2">Loading...</span>
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginForm;
