import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ onSubmit, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password); // Call the parent's submit function
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label>Email</label>
        <input
          type="email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label>Password</label>
        <input
          type="password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="bg-blue-500 text-white p-2 w-full">Login</button>
      <p>
        First time user? <Link to={"/register"}>Register</Link>
      </p>
    </form>
  );
};

export default LoginForm;
