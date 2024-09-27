import { useEffect, useState } from "react";
import tokenService from "../services/tokenService";
import authService from "../services/authService";

const Transactions = () => {
  const [transactions, setTransactions] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ email: "", publicKey: "" });
  const getTransactions = async () => {
    setLoading(true);
    const transactions = await tokenService.transactions();
    console.log(transactions.transactions);
    setTransactions(transactions.transactions);
    const user_ = authService.getUser();
    setUser(user_);
    setLoading(false);
    console.log(user_, user);
  };
  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <>
      <div>
        <div>
          {transactions ? (
            <table>
              <tbody>
                <tr className="text-center px-4 border-2 border-gray-500">
                  <td>Block Number</td>
                  <td>From</td>
                  <td>To</td>
                  <td>Amount</td>
                </tr>
                {transactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className={
                      transaction.from === user.publicKey
                        ? "px-4 bg-green-200 border-2 border-gray-400"
                        : "px-4 bg-red-200 border-2 border-gray-400"
                    }
                  >
                    <td>{transaction.blockNumber}</td>
                    <td>
                      <span className="flex flex-col px-4">
                        <span>{transaction.fromEmail}</span>
                        <span>{transaction.from}</span>
                      </span>
                    </td>
                    <td>
                      <span className="flex flex-col px-4">
                        <span>{transaction.toEmail}</span>
                        <span>{transaction.to}</span>
                      </span>
                    </td>
                    <td>{transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No Transactions found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Transactions;

// {
//     "from": "0x1Db1cFE4703efcfD429D12e0F0606a0CBd06D920",
//     "fromEmail": "unknown",
//     "to": "0x20D97e0cacD7A6b350E0CDC42999313849880a28",
//     "toEmail": "sly3443sly@gmail.com",
//     "amount": "10.0",
//     "blockNumber": 6744787,
//     "transactionHash": "0x5e2358da6367415784369674f646248843e86fc0e30742c0661f16caff33547f",
//     "timestamp": "2024-09-23T11:12:12.000Z"
//   }
