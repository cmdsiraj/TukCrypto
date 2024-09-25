const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = {
  async create(email, password, publickey, encrypted_privateKey) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (email, password, private_key, public_key) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [email, hashedPassword, encrypted_privateKey, publickey];
    const res = await pool.query(query, values);
    return res.rows[0];
  },

  async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const res = await pool.query(query, values);
    return res.rows[0];
  },

  generateToken(user) {
    return jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
  },
};

module.exports = User;
