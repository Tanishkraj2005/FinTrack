import React from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

const Card = ({ title, value, color, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass-card p-6 flex items-center justify-between"
  >
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{title}</p>
      <h2 className={`text-3xl font-bold tracking-tight ${color}`}>
        ₹ {value.toLocaleString()}
      </h2>
    </div>
    <div className={`p-4 rounded-full bg-opacity-10 dark:bg-opacity-20 ${color.replace('text', 'bg')}`}>
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
  </motion.div>
);

function SummaryCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const balance = income - expense;

  return (
    <div className="grid md:grid-cols-3 gap-6 section">
      <Card title="Total Balance" value={balance} color="text-indigo-600" icon={Wallet} delay={0.1} />
      <Card title="Total Income" value={income} color="text-emerald-500" icon={TrendingUp} delay={0.2} />
      <Card title="Total Expense" value={expense} color="text-rose-500" icon={TrendingDown} delay={0.3} />
    </div>
  );
}

export default SummaryCards;
