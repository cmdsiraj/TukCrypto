import { useEffect, useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(authService.isAuthenticated());
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  }, [isAuth, navigate]);

  return isAuth;
};
