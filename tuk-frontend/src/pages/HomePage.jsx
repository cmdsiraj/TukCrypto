import React, { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuth } from "../hooks/useAuth";
import NotificationsPanel from "../components/NotificationsPanel";
import authService from "../services/authService";
import tokenService from "../services/tokenService";
import tokenImage from "../assets/token_img.jpg";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import "../styles/HomePageCustomStyle.css";
import Actions from "../components/Actions";

const HomePage = () => {
  useAuth(); // Protects the home page
  const [notification, setNotification] = useState(false);
  const [user, setUser] = useState({ email: "", publicKey: "" });
  const [balance, setBalance] = useState(0.0);
  const [fetchingBalance, setFetchingBalance] = useState(true);

  const fetchBalance = async () => {
    setFetchingBalance(true);
    const currentBalance = await tokenService.fetchBalance();
    setBalance(currentBalance);
    setFetchingBalance(false);
    setInterval(async () => {
      const currentBalance = await tokenService.fetchBalance();
      setBalance(currentBalance);
    }, 20000);
  };

  useEffect(() => {
    const user = authService.getUser();
    setUser(user);
    fetchBalance();
  }, []);

  const handleNotification = () => {
    setNotification(!notification);
  };

  const copyToClipboard = () => {
    const publicKey = user.publicKey;
    navigator.clipboard
      .writeText(publicKey)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text");
      });
  };

  const trimText = (text, length) => {
    return text.slice(0, length) + "...";
  };

  return (
    <div
      className="h-screen w-full font-mono pb-4"
      onClick={() => (notification ? setNotification(false) : "")}
    >
      <nav className="bg-sky-300 px-4 py-4 flex-row relative shadow-md">
        <ul className="flex flex-row">
          <li className="flex flex-row gap-1">
            <img src={tokenImage} alt="coin" className="w-8 h-8 rounded-full" />
            <span className="self-end text-2xl font-extrabold text-orange-600">
              TukCoin
            </span>
          </li>
          <li className="cursor-pointer ml-auto" onClick={handleNotification}>
            {!notification ? (
              <NotificationsNoneIcon />
            ) : (
              <span className="relative">
                <NotificationsIcon />
              </span>
            )}
          </li>
        </ul>
        {notification && <NotificationsPanel />}
      </nav>
      <section className="flex flex-col items-center h-full">
        <div className="px-4 max-w-96 bg-gray-100 max-h-fit mt-4 rounded-2xl p-6">
          <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-xl shadow-lg p-8 max-w-sm text-center">
            <h1 className="text-xl">
              Welcome{" "}
              <span className="text-2xl text-cyan-700 underline-hover">
                {user.email}!
              </span>
            </h1>
            <div className="pt-10">
              <p>Your Balance</p>
              <p className="text-2xl">
                TC{""}
                {fetchingBalance ? (
                  <span>fetching...</span>
                ) : (
                  <span className="text-5xl">{balance}</span>
                )}
              </p>
            </div>
            <div className="text-xs pt-2 text-gray-500 cursor-default">
              <span> your Public key: {trimText(user.publicKey, 15)}</span>
              <span className="cursor-pointer" onClick={copyToClipboard}>
                <ContentCopyRoundedIcon fontSize="small" />
              </span>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <Actions />
      </section>
    </div>
  );
};

export default HomePage;
