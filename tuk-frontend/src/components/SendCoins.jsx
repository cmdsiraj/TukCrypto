import { useState } from "react";
import tokenService from "../services/tokenService";

const SendCoins = ({ balance }) => {
  const [amount, setAmount] = useState();
  const [email, setEmail] = useState();
  const [key, setKey] = useState();
  const [loading, setLoading] = useState(false);

  const sendCoins = async () => {
    console.log(amount, email);
    if (amount && email) {
      setLoading(true);
      const response = await tokenService.sendCoins(amount, email);
      setLoading(false);
      console.log("response", response);
    } else {
      console.log("empty fields");
    }
  };

  return (
    <div className="w-full felx flex-col py-4 relative">
      {loading && (
        <div className="absolute h-full w-full right-0 bg-white bg-opacity-80 flex justify-center items-center pointer-events-none">
          <p>Transaction being processed....</p>
        </div>
      )}
      <span className="flex flex-row justify-between">
        <p className="self-end">Enter Token Amount</p>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border-b-2 border-b-gray-300 outline-none focus:border-b-gray-600"
        />
      </span>
      <span className="flex flex-col mt-6">
        Send Via email
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border-b-2 border-b-gray-300 outline-none focus:border-b-gray-600"
        />
      </span>
      <span className="w-full text-center bg-red-300">or</span>
      <span className="flex flex-col mt-6">
        Send Via User public key
        <input
          type="text"
          onChange={(e) => setKey(e.target.value)}
          className="p-2 border-b-2 border-b-gray-300 outline-none focus:border-b-gray-600"
        />
      </span>
      <span className="flex flex-col mt-6">
        <button className="bg-orange-400 p-2" onClick={sendCoins}>
          Send Coins
        </button>
      </span>
    </div>
  );
};

export default SendCoins;
