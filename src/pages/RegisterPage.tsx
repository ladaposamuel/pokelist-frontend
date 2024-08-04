import RegisterForm from "../components/RegisterForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

document.title = "Create an account | PokeList";

const RegisterPage = ({ showToast }: { showToast: Function }) => {
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

        <RegisterForm showToast={showToast} />
      </div>
    </div>
  );
};

export default RegisterPage;
