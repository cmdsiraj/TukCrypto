import React, { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuth } from "../hooks/useAuth";
import NotificationsPanel from "../components/NotificationsPanel";
import authService from "../services/authService";
import tokenService from "../services/tokenService";

const HomePage = () => {
  useAuth(); // Protects the home page
  const [notification, setNotification] = useState(false);

  const handleNotification = () => {
    setNotification(!notification);
  };

  return (
    <>
      <nav className="bg-sky-300 px-4 py-2 flex-row">
        <ul className="flex flex-row">
          <li>
            <span className="">TukCoin</span>
          </li>
          <li className="cursor-pointer ml-auto" onClick={handleNotification}>
            {!notification ? (
              <NotificationsNoneIcon />
            ) : (
              <span className="relative">
                <NotificationsIcon />
                <NotificationsPanel />
              </span>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HomePage;
