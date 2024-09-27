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
    console.log(data);
    return data.balance;
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
};

const sendCoins = async (amount, toEmail) => {
  const token = authService.getToken();
  try {
    const response = await fetch(`${BASE_URL}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ toEmail, amount }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending coins:", error.message);
    console.error(error.message);
  }
};

const transactions = async () => {
  const token = authService.getToken();
  try {
    const response = await fetch(`${BASE_URL}/transactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending coins:", error.message);
    console.error(error.message);
  }
};

const tokenService = {
  fetchBalance,
  sendCoins,
  transactions,
};

export default tokenService;
