import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const RegisterPage: React.FC = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Create an account</h4>
      </div>
      <div className="card-body">
        <Row className="mb-4">
          <Col md={12}>
            Fill out the form below, select your favourite organisation and
            create your account. You will be able to login to your account using
            the email address you provided.
          </Col>
        </Row>

        <Form>
          <Form.Group as={Row} className="form-group">
            <Form.Label>Name</Form.Label>
            <Col md={6}>
              <Form.Control type="text" id="name" name="name" required />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="form-group mt-4">
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

          <Form.Group as={Row} className="form-group mt-4">
            <Form.Label>Choose an Orgainsation</Form.Label>
            <Col md={6}>
              <Form.Select aria-label="Default select example">
                <option>-- Select an Organisation --</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Row className="mt-4">
            <Col>
              <Button variant="primary" type="submit">
                Create an account
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};
