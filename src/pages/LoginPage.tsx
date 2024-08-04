import LoginForm from "../components/LoginForm";

export const LoginPage = ({ showToast }: { showToast: Function }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Login to PokeList Organisation</h4>
      </div>
      <div className="card-body">
        <LoginForm showToast={showToast} />
      </div>
    </div>
  );
};
