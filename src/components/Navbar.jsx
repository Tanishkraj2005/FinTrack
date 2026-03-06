import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import useTransactions from "../hooks/useTransactions";
import useBudget from "../hooks/useBudget";
import DarkModeToggle from "./DarkModeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LogOut, RotateCcw, ChevronDown, TrendingUp } from "lucide-react";

export default function Navbar({ onAdd }) {
  const { currentUser, logout } = useAuth();
  const { resetAllTransactions } = useTransactions();
  const { resetBudget } = useBudget();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const name = currentUser?.displayName || "User";
  const email = currentUser?.email || "";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleReset = async () => {
    const confirmReset = window.confirm(
      "Are you sure you want to delete all your data? This action cannot be undone."
    );
    if (confirmReset) {
      await resetAllTransactions();
      await resetBudget();
      setOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="sticky top-0 z-50 px-4 sm:px-6 md:px-10 py-3 flex justify-between items-center
                 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-indigo-100/50 dark:border-gray-700/50
                 shadow-sm transition-colors duration-300"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
            boxShadow: "0 4px 14px rgba(79,70,229,0.35)",
          }}
        >
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-indigo-950 dark:text-white">
            FinTrack
          </h1>
          <p className="text-xs text-indigo-500 dark:text-indigo-400 hidden sm:block" style={{ lineHeight: 1 }}>
            Smart Finance Manager
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">

        {/* Add Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onAdd}
          className="hidden sm:flex items-center gap-2 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-sm font-semibold transition"
          style={{
            background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
            boxShadow: "0 4px 14px rgba(79,70,229,0.3)",
          }}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden md:inline">Add Transaction</span>
          <span className="md:hidden">Add</span>
        </motion.button>

        {/* Dark Mode Toggle */}
        <DarkModeToggle />

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1.5 sm:gap-2 font-medium px-2 sm:px-3 py-2 rounded-xl transition-all
                       bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-700/50
                       text-indigo-800 dark:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
          >
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}
            >
              {name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:block truncate max-w-[90px] text-sm">{name}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-indigo-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 mt-2 w-52 sm:w-56 p-1.5 z-50 rounded-2xl
                           bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-700/60
                           shadow-[0_20px_60px_rgba(79,70,229,0.18),0_4px_20px_rgba(0,0,0,0.08)]
                           dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              >
                {/* User Info */}
                <div className="px-3 py-2.5 mb-1 rounded-xl bg-indigo-50 dark:bg-indigo-900/30">
                  <p className="text-xs font-semibold truncate text-indigo-950 dark:text-white">
                    {name}
                  </p>
                  <p className="text-xs truncate text-gray-500 dark:text-gray-400">
                    {email}
                  </p>
                </div>

                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                             text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10"
                >
                  <RotateCcw className="w-4 h-4 flex-shrink-0" />
                  Reset Data
                </button>

                <div className="my-1 mx-1 h-px bg-indigo-100 dark:bg-gray-700/60" />

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                             text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                >
                  <LogOut className="w-4 h-4 flex-shrink-0" />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
