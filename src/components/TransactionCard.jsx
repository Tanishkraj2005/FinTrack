import React from "react";
import { motion } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";

function TransactionCard({ transaction, onEdit, onDelete }) {
  const isIncome = transaction.type === "income";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.01 }}
      className="glass-card p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/60 dark:bg-darksurface/60 border border-white/40 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-darksurface/80"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isIncome ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600' : 'bg-rose-100 dark:bg-rose-900/40 text-rose-600'}`}>
          <span className="text-xl font-bold">{transaction.title.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 placeholder-opacity-90">
            {transaction.title}
          </h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md inline-block mt-1">
            {transaction.category}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-100 dark:border-gray-800 pt-3 md:pt-0">
        <span
          className={`font-semibold text-xl tracking-tight ${isIncome ? "text-emerald-500" : "text-rose-500"
            }`}
        >
          {isIncome ? "+" : "-"} ₹ {Number(transaction.amount).toLocaleString()}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(transaction)}
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(transaction.id)}
            className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default TransactionCard;
