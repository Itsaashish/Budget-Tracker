"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

function ExpenseChart({ transactions, darkMode }) {
  const [chartType, setChartType] = useState("expense"); // 'expense' or 'income'

  // Filter transactions by type and group by category
  const filteredTransactions = transactions.filter((t) => t.type === chartType);

  // Group by category and sum amounts
  const categoryData = filteredTransactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;

    if (!acc[category]) {
      acc[category] = 0;
    }

    acc[category] += amount;
    return acc;
  }, {});

  // Convert to array format for chart
  const chartData = Object.keys(categoryData).map((category) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: categoryData[category],
  }));

  // Sort by value (highest first)
  chartData.sort((a, b) => b.value - a.value);

  // Colors for the chart
  const COLORS = darkMode
    ? [
        "#f5f5f5",
        "#e5e5e5",
        "#d4d4d4",
        "#a3a3a3",
        "#737373",
        "#525252",
        "#404040",
        "#262626",
      ]
    : [
        "#000000",
        "#262626",
        "#404040",
        "#525252",
        "#737373",
        "#a3a3a3",
        "#d4d4d4",
        "#e5e5e5",
      ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const totalAmount = chartData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-2 border dark:border-gray-700 shadow-sm rounded-md">
          <p className="font-medium">{data.name}</p>
          <p>{formatCurrency(data.value)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {((data.value / totalAmount) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 border dark:border-gray-700 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Distribution</h2>
        <div className="flex">
          <button
            onClick={() => setChartType("expense")}
            className={`px-3 py-1 text-sm rounded-l-md ${
              chartType === "expense"
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => setChartType("income")}
            className={`px-3 py-1 text-sm rounded-r-md ${
              chartType === "income"
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Income
          </button>
        </div>
      </div>

      {chartData.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            No {chartType} data to display
          </p>
        </div>
      )}

      {chartData.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Top Categories:</p>
          {chartData.slice(0, 3).map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="text-sm font-medium">
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseChart;
