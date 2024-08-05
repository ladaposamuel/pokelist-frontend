import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContainer } from "./components/Container";
import { AuthProvider } from "./context/userContext";
import { ToastProvider } from "./context/toastContext";

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <AppContainer />
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
