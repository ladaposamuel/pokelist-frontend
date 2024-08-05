import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { Organisation, User } from "../types";
import { useOrganisation } from "../api";
import { useUser } from "../api";
import { useAuth } from "../context/userContext";
import { useToast } from "../context/toastContext";
import Alert from "react-bootstrap/Alert";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const { fetchOrganisations } = useOrganisation();

  const { saveToken, keepUserLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { registerUser } = useUser();

  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    organisation: false,
  });
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    organisation: "",
    successMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organisations = await fetchOrganisations();
        setOrganisations(organisations);
      } catch (error: any) {
        showToast(
          "Error",
          `Failed to fetch organisations: ${error.message}`,
          "warning"
        );
      }
    };
    fetchData();
  }, []);

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
      name: !state.name,
      email: !state.email,
      password: !state.password,
      organisation: !state.organisation,
    });

    const isValid =
      state.name && state.email && state.password && state.organisation;

    if (isValid) {
      try {
        const newUser = await registerUser({
          name: state.name,
          email: state.email,
          password: state.password,
          organisationId: Number(state.organisation),
        } as User);
        setIsLoading(false);
        showToast("Success", "Account created successfully!", "success");

        saveToken(newUser.token);
        keepUserLoggedIn(newUser);

        navigate("/dashboard");

        setState((prev) => ({ ...prev, successMessage: "" }));
      } catch (error: any) {
        setIsLoading(false);
        showToast("Error", `Failed to create account: ${error}`, "warning");
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Form>
      <Form.Group as={Row} className="form-group">
        <Form.Label>Name</Form.Label>
        <Col md={6}>
          <Form.Control
            type="text"
            id="name"
            value={state.name}
            required
            isInvalid={error.name}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="form-group mt-4">
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

      {organisations && organisations.length > 0 ? (
        <Form.Group as={Row} className="form-group mt-4">
          <Form.Label>Choose an Organization</Form.Label>
          <Col md={6}>
            <Form.Select
              id="organisation"
              value={state.organisation}
              required
              isInvalid={error.organisation}
              onChange={handleChange}
            >
              <option value="">-- Select an Organization --</option>
              {organisations.map((organisation) => (
                <option key={organisation.id} value={organisation.id}>
                  {organisation.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
      ) : (
        organisations === null && <Spinner animation="border" role="status" />
      )}

      {organisations && organisations.length === 0 && (
        <Row className="mt-4">
          <Col md={6}>
            <Alert variant={"warning"}>
              We couldn't find any organisations, and registeration is currently{" "}
              <b>disabled</b>. Please try again later.
            </Alert>
          </Col>
        </Row>
      )}

      <Row className="mt-4">
        <Col>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading || organisations.length === 0}
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
              "Create an account"
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default RegisterForm;
