import LoginForm from "../components/LoginForm";

document.title = "Login | PokeList";

export const LoginPage = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Login to PokeList Organisation</h4>
      </div>
      <div className="card-body">
        <LoginForm />
      </div>
    </div>
  );
};
