import { TrendingDownIcon, TrendingUpIcon, DollarSignIcon } from "lucide-react";

function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const balance = income - expenses;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 rounded-lg border dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
            <TrendingUpIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Income</p>
            <p className="text-xl font-semibold text-green-600 dark:text-green-400">
              {formatCurrency(income)}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg border dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-red-100 dark:bg-red-900">
            <TrendingDownIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Expenses</p>
            <p className="text-xl font-semibold text-red-600 dark:text-red-400">
              {formatCurrency(expenses)}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg border dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
            <DollarSignIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
            <p
              className={`text-xl font-semibold ${
                balance >= 0
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatCurrency(balance)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
