import authService from "./authService";

const BASE_URL = "http://localhost:3000";

const fetchBalance = async () => {
  const token = authService.getToken();
  try {
    const response = await fetch(`${BASE_URL}/balance`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
};

const tokenService = {
  fetchBalance,
};

export default tokenService;
