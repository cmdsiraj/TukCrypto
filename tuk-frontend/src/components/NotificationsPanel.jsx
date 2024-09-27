import React from "react";
const NotificationsPanel = () => {
  return (
    <div className="absolute right-2 min-w-48 max-w-56 bg-neutral-200 mt-3 font-semibold text-base shadow-lg rounded-lg">
      <ul className="py-1">
        <li className="my-2 bg-slate-400 px-4 cursor-pointer hover:bg-slate-300">
          Notification 1
        </li>
        <li className="my-2 px-4 cursor-pointer hover:bg-slate-300">
          Notification 2
        </li>
        <li className="my-2 px-4 cursor-pointer hover:bg-slate-300">
          Notification 3
        </li>
        <li className="my-2 px-4 cursor-pointer hover:bg-slate-300">
          Notification 4
        </li>
      </ul>
    </div>
  );
};

export default NotificationsPanel;
