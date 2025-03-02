"use client";

import { useState } from "react";
import { FilterIcon, XIcon } from "lucide-react";

function FilterSection({ filter, setFilter }) {
  const [isOpen, setIsOpen] = useState(false);

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
  const allCategories = [...expenseCategories, ...incomeCategories];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const clearFilters = () => {
    setFilter({
      dateFrom: "",
      dateTo: "",
      category: "all",
      type: "all",
    });
  };

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={toggleFilters}
          className="flex items-center gap-2 text-sm font-medium"
        >
          <FilterIcon className="h-4 w-4" />
          {isOpen ? "Hide Filters" : "Show Filters"}
        </button>

        {(filter.dateFrom ||
          filter.dateTo ||
          filter.category !== "all" ||
          filter.type !== "all") && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-1"
          >
            <XIcon className="h-3 w-3" />
            Clear filters
          </button>
        )}
      </div>

      {isOpen && (
        <div className="p-4 border dark:border-gray-700 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="dateFrom"
              >
                From Date
              </label>
              <input
                type="date"
                id="dateFrom"
                name="dateFrom"
                value={filter.dateFrom}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded-md bg-transparent"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="dateTo"
              >
                To Date
              </label>
              <input
                type="date"
                id="dateTo"
                name="dateTo"
                value={filter.dateTo}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded-md bg-transparent"
              />
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
                value={filter.category}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded-md bg-transparent"
              >
                <option value="all">All Categories</option>
                {allCategories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="type">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={filter.type}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded-md bg-transparent"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterSection;
