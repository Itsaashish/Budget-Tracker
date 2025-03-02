"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import FilterSection from "./components/FilterSection";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [filter, setFilter] = useState({
    dateFrom: "",
    dateTo: "",
    category: "all",
    type: "all",
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : true;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by date range
    if (
      filter.dateFrom &&
      new Date(transaction.date) < new Date(filter.dateFrom)
    )
      return false;
    if (filter.dateTo && new Date(transaction.date) > new Date(filter.dateTo))
      return false;

    // Filter by category
    if (filter.category !== "all" && transaction.category !== filter.category)
      return false;

    // Filter by type
    if (filter.type !== "all" && transaction.type !== filter.type) return false;

    return true;
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      } transition-colors duration-200`}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <Summary transactions={filteredTransactions} />
            <TransactionForm addTransaction={addTransaction} />
          </div>
          <div className="lg:col-span-1">
            <ExpenseChart
              transactions={filteredTransactions}
              darkMode={darkMode}
            />
          </div>
        </div>

        <FilterSection filter={filter} setFilter={setFilter} />

        <TransactionList
          transactions={filteredTransactions}
          deleteTransaction={deleteTransaction}
        />
      </div>
    </div>
  );
}

export default App;
