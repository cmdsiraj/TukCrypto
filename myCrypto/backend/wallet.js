const { ethers } = require("ethers");
const crypto = require("crypto");

const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = process.env.SECRET_KEY; // Must be 32 bytes
const IV = crypto.randomBytes(16);

// Generate a new wallet
const createWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  return {
    publicKey: wallet.address,
    privateKey: wallet.privateKey,
  };
};

// Encrypt the private key
const encrypt = (text) => {
  let cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(SECRET_KEY, "hex"),
    IV
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return IV.toString("hex") + ":" + encrypted.toString("hex");
};

// Decrypt the private key
const decrypt = (encryptedText) => {
  let parts = encryptedText.split(":");
  let iv = Buffer.from(parts.shift(), "hex");
  let encryptedTextBuffer = Buffer.from(parts.join(":"), "hex");
  let decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(SECRET_KEY, "hex"),
    iv
  );
  let decrypted = decipher.update(encryptedTextBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

module.exports = { createWallet, encrypt, decrypt };
