/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function BudgetModal({
  isOpen,
  onClose,
  onSave,
  existingLimit,
}) {
  const [limit, setLimit] = useState("");

  useEffect(() => {
    if (existingLimit) {
      setLimit(existingLimit);
    } else {
      setLimit("");
    }
  }, [existingLimit]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!limit) return;

    onSave(limit);
    setLimit("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-sm glass-card bg-white/90 dark:bg-gray-900/90 p-6 md:p-8 shadow-2xl border border-white/20 dark:border-gray-700/50 rounded-3xl text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-2 tracking-tight text-gray-900 dark:text-gray-100 mt-2">
          Monthly Budget
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Set a limit to stay on top of your spending.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Budget Limit (₹)</label>
            <input
              type="number"
              placeholder="e.g., 5000"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-none ring-1 ring-gray-200 dark:ring-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-center text-lg font-semibold"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 text-lg"
          >
            Save Budget
          </motion.button>
        </form>

      </motion.div>
    </div>
  );
}
