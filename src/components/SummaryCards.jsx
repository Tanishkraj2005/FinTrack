import React from "react";

function SummaryCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const balance = income - expense;

  const Card = ({ title, value, color }) => (
    <div className="card p-6">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {title}
      </p>
      <h2 className={`text-3xl font-semibold ${color}`}>
        ₹ {value.toLocaleString()}
      </h2>
    </div>
  );

  return (
    <div className="grid md:grid-cols-3 gap-6 section">
      <Card title="Total Balance" value={balance} color="text-indigo-600" />
      <Card title="Total Income" value={income} color="text-emerald-500" />
      <Card title="Total Expense" value={expense} color="text-rose-500" />
    </div>
  );
}

export default SummaryCards;
