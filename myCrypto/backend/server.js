require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const User = require("./models/user");
const pool = require("./db");
const { authenticateJWT } = require("./middleware");
const bcrypt = require("bcrypt");
const walletUtils = require("./wallet");
const cors = require("cors");

// Environment variables
const RPC_URL = process.env.RPC_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const FAUCET_AMOUNT = ethers.utils.parseEther("0.5");

// Initialize express and ethers.js
const app = express();
app.use(express.json());
app.use(cors());

// ERC20 ABI
const abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint amount) returns (bool)",
  "function mint(address to, uint256 amount) public",
  "function faucet() public",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

// console.log("register");
// User registration
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const { publicKey, privateKey } = walletUtils.createWallet();
  const encryptedPrivateKey = walletUtils.encrypt(privateKey);

  try {
    await User.create(email, password, publicKey, encryptedPrivateKey);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// console.log("login");
// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const token = User.generateToken(user);
    res.json({
      token,
      user: { email: user.email, publicKey: user.public_key },
    });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// console.log("balance");
// Get balance for a user
app.get("/balance", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findByEmail(req.user.email);
    if (!user) return res.status(400).send("User not found");

    const privateKey = walletUtils.decrypt(user.private_key);
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

    const balance = await contract.balanceOf(wallet.address);
    res.json({ balance: ethers.utils.formatUnits(balance, 18) });
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// console.log("send");
// Sending tokens
app.post("/send", authenticateJWT, async (req, res) => {
  const { toEmail, amount } = req.body;

  try {
    const sender = await User.findByEmail(req.user.email);
    const receiver = await User.findByEmail(toEmail);

    if (!sender || !receiver) {
      return res.status(400).send("Invalid sender or receiver email");
    }

    const privateKey = walletUtils.decrypt(sender.private_key);
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

    const tx = await contract.transfer(
      receiver.public_key,
      ethers.utils.parseUnits(amount.toString(), 18)
    );
    await tx.wait();

    res.json({ status: "success", txHash: tx.hash });
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// console.log("mint");
// Mint new tokens
app.post("/mint", authenticateJWT, async (req, res) => {
  const { amount } = req.body; // Ensure you pass amount from request body

  try {
    const user = await User.findByEmail(req.user.email);
    const privateKey = walletUtils.decrypt(user.private_key);
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

    const tx = await contract.mint(
      wallet.address,
      ethers.utils.parseUnits(amount.toString(), 18)
    );
    await tx.wait();

    res.json({ status: "success", txHash: tx.hash });
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// console.log("keys");
// API to get user's keys
app.get("/keys", authenticateJWT, async (req, res) => {
  const email = req.user.email; // Get email from JWT
  try {
    const user = await pool.query(
      "SELECT private_key, public_key FROM users WHERE email = $1",
      [email]
    );
    // console.log(user);
    if (user.rows.length === 0) {
      return res.status(404).send("User not found");
    }

    const { public_key, private_key } = user.rows[0];
    res.json({
      privateKey: walletUtils.decrypt(private_key),
      publicKey: public_key,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving keys");
  }
});

// console.log("faucet");
// Faucet (restricted to the owner)
app.post("/faucet", async (req, res) => {
  try {
    const tx = await contract.faucet();
    await tx.wait();
    res.json({ status: "success", txHash: tx.hash });
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
