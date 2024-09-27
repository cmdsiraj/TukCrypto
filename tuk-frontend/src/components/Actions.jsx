import React, { useState } from "react";

import NorthEastIcon from "@mui/icons-material/NorthEast";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SendCoins from "./SendCoins";
import Transactions from "./Transactions";

const Actions = () => {
  const [active, setActive] = useState(-1);
  let normalStyle = "px-8 py-2 cursor-pointer underline-hover";
  let activeStyle =
    "px-8 py-2 cursor-pointer border-b-4 border-b-cyan-400 underline-hover";
  return (
    <>
      <div className="mt-12 min-w-96">
        <ul className="flex flex-row justify-evenly border-b-2 w-full">
          <li
            className={active === 0 ? activeStyle : normalStyle}
            onClick={() => setActive(0)}
          >
            <NorthEastIcon />
          </li>
          <li
            className={active === 1 ? activeStyle : normalStyle}
            onClick={() => setActive(1)}
          >
            <CompareArrowsIcon />
          </li>
        </ul>
        {active === 0 && <SendCoins />}
        {active === 1 && <Transactions />}
      </div>
    </>
  );
};

export default Actions;
