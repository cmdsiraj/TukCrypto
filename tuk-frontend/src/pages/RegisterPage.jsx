import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import authService from "../services/authService";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (email, password) => {
    try {
      await authService.register(email, password);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col gap-3">
        <Link
          to={"/login"}
          className="text-base hover:bg-slate-700 hover:text-white w-fit px-2"
        >
          <span className="text-lg">&larr;</span> Back
        </Link>
        <RegisterForm onSubmit={handleRegister} error={error} />
      </div>
    </div>
  );
};

export default RegisterPage;
