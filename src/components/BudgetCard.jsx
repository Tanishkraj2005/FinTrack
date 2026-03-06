import React from 'react';
import { motion } from 'framer-motion';
import { Target, Edit2 } from 'lucide-react';

function BudgetCard({
  budget,
  monthlyExpense,
  onEdit,
}) {
  if (!budget) {
    return (
      <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center mb-4">
          <Target className="w-8 h-8 text-indigo-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Set Your Monthly Budget</h3>
        <p className="text-gray-500 mb-6 max-w-sm">
          Keep track of your spending by setting a target for your monthly expenses.
        </p>
        <button
          onClick={onEdit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition shadow-lg hover:shadow-indigo-500/30"
        >
          Set Budget Limit
        </button>
      </div>
    );
  }

  const percentage = (monthlyExpense / budget.limit) * 100;
  const remaining = budget.limit - monthlyExpense;

  let barColor = "bg-indigo-600";
  let gradientColor = "from-indigo-500 to-indigo-600";

  if (percentage >= 80 && percentage < 100) {
    barColor = "bg-yellow-500";
    gradientColor = "from-yellow-400 to-yellow-500";
  }
  if (percentage >= 100) {
    barColor = "bg-red-500";
    gradientColor = "from-red-500 to-red-600";
  }

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight">
            Monthly Budget Focus
          </h3>
        </div>
        <button
          onClick={onEdit}
          className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center gap-1 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg"
        >
          <Edit2 className="w-4 h-4" /> Edit
        </button>
      </div>

      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Used so far</p>
          <p className="text-2xl font-bold tracking-tight">₹ {monthlyExpense.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-500 mb-1">Monthly Limit</p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">₹ {Number(budget.limit).toLocaleString()}</p>
        </div>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4 overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${gradientColor} relative`}
        >
          <div className="absolute inset-0 bg-white/20 overflow-hidden">
            <div className="w-[200%] h-full flex bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.2)_10px,rgba(255,255,255,0.2)_20px)] animate-[pan_20s_linear_infinite]" />
          </div>
        </motion.div>
      </div>

      <div className="flex justify-between items-center text-sm font-medium">
        <p className={`${percentage >= 100 ? 'text-red-500' : 'text-gray-500'}`}>
          {percentage.toFixed(1)}% Subscribed
        </p>
        <p className={`${remaining <= 0 ? 'text-red-500' : 'text-emerald-500'}`}>
          {remaining > 0 ? `₹ ${remaining.toLocaleString()} Remaining` : 'Over limit!'}
        </p>
      </div>
    </div>
  );
}

export default BudgetCard;
