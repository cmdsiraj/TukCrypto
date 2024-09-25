import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4">
        <nav className="flex space-x-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <main className="flex-grow p-4">{children}</main>
      <footer className="bg-blue-500 text-white text-center p-4">Footer</footer>
    </div>
  );
};

export default Layout;
