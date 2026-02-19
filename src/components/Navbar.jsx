import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import useTransactions from "../hooks/useTransactions";
import useBudget from "../hooks/useBudget";

export default function Navbar({ onAdd }) {
  const { currentUser, logout } = useAuth();
  const { resetAllTransactions } = useTransactions();
  const { resetBudget } = useBudget();

  const [open, setOpen] = useState(false);

  const name = currentUser?.displayName || "User";

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
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-8 py-4 flex justify-between items-center">

      {/* Logo */}
      <h1 className="text-xl font-bold tracking-tight">
        <span className="text-indigo-600">Fin</span>
        <span className="text-gray-900 dark:text-white">Track</span>
      </h1>

      <div className="flex items-center gap-6">

        {/* Add Button */}
        <button
          onClick={onAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition"
        >
          + Add
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="font-medium text-gray-800 dark:text-white"
          >
            {name}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 bg-white dark:bg-[#111827] shadow-xl rounded-xl p-2 w-40 border border-gray-200 dark:border-gray-700">

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="block w-full text-left px-4 py-2 text-yellow-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm"
              >
                Reset Data
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm"
              >
                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
