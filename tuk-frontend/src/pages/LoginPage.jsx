import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import authService from "../services/authService";

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await authService.login(email, password);
      navigate("/"); // Redirect to home page on successful login
    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
};

export default LoginPage;
