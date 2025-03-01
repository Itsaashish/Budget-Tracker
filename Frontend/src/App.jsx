import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Summary from "./components/Summary";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
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
    </>
  );
}

export default App;
