import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContainer } from "./components/Container";
import { AuthProvider } from "./context/userContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;
