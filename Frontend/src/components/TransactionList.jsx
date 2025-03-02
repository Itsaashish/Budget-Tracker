import { formatDistanceToNow } from "date-fns";
import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "lucide-react";

function TransactionList({ transactions, deleteTransaction }) {
  if (transactions.length === 0) {
    return (
      <div className="mt-8 text-center p-8 border dark:border-gray-700 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">
          No transactions found. Add some to get started!
        </p>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getCategoryIcon = (category) => {
    // You could replace this with actual icons for each category
    return category.charAt(0).toUpperCase();
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-right">Amount</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="py-3 px-4">
                  <div>{new Date(transaction.date).toLocaleDateString()}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(transaction.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </td>
                <td className="py-3 px-4">{transaction.description}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-xs">
                      {getCategoryIcon(transaction.category)}
                    </span>
                    <span>
                      {transaction.category.charAt(0).toUpperCase() +
                        transaction.category.slice(1)}
                    </span>
                  </div>
                </td>
                <td
                  className={`py-3 px-4 text-right font-medium ${
                    transaction.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  <div className="flex items-center justify-end gap-1">
                    {transaction.type === "income" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    )}
                    {formatCurrency(transaction.amount)}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                    aria-label="Delete transaction"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList;
