const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";
const BASE_URL = "http://localhost:3000";

const login = async (email, password) => {
  // Replace with actual API call
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  } else {
    throw new Error(data.message);
  }
};

const register = async (email, password) => {
  // Replace with actual API call
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const getUser = () => {
  return localStorage.getItem(USER_KEY);
};

const isAuthenticated = () => {
  const token = getToken();
  // Optional: Add token expiration check logic here
  return !!token;
};

const authService = {
  login,
  register,
  logout,
  getToken,
  isAuthenticated,
  getUser,
};

export default authService;
