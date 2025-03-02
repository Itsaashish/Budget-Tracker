"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";

function TransactionForm({ addTransaction }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    category: "food",
    type: "expense",
    amount: "",
  });

  const expenseCategories = [
    "food",
    "transportation",
    "housing",
    "utilities",
    "entertainment",
    "healthcare",
    "education",
    "other",
  ];
  const incomeCategories = [
    "salary",
    "freelance",
    "investments",
    "gifts",
    "other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type" && value === "income") {
      setFormData({ ...formData, type: value, category: "salary" });
    } else if (name === "type" && value === "expense") {
      setFormData({ ...formData, type: value, category: "food" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.description || !formData.amount) {
      alert("Please fill in all fields");
      return;
    }

    const transaction = {
      ...formData,
      amount: Number.parseFloat(formData.amount),
      createdAt: new Date().toISOString(),
    };

    addTransaction(transaction);

    // Reset form
    setFormData({
      date: new Date().toISOString().split("T")[0],
      description: "",
      category: formData.type === "expense" ? "food" : "salary",
      type: formData.type,
      amount: "",
    });
  };

  return (
    <div className="mt-8 p-6 rounded-lg border dark:border-gray-700 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-600 rounded-md bg-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="type">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-600 rounded-md bg-transparent"
              required
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-600 rounded-md bg-transparent"
              required
            >
              {formData.type === "expense"
                ? expenseCategories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))
                : incomeCategories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              className="w-full p-2 border dark:border-gray-600 rounded-md bg-transparent"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What was this transaction for?"
              className="w-full p-2 border dark:border-gray-600 rounded-md bg-transparent"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full flex items-center justify-center gap-2 bg-black dark:bg-white dark:text-black text-white py-2 px-4 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          <PlusIcon className="h-4 w-4" />
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
