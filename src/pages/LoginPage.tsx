import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const LoginPage: React.FC = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Login to PokeList Organisation</h4>
      </div>
      <div className="card-body">
        <Form>
          <Form.Group as={Row} className="form-group">
            <Form.Label>E-Mail Address</Form.Label>
            <Col md={6}>
              <Form.Control
                type="text"
                id="email_address"
                name="email-address"
                required
                autoFocus
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="form-group mt-4">
            <Form.Label>Password</Form.Label>
            <Col md={6}>
              <Form.Control
                type="password"
                id="password"
                name="password"
                required
              />
            </Col>
          </Form.Group>

          <Row className="mt-4">
            <Col>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};
