import { useAuth } from "../context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";
import { useState } from "react";

export default function Navbar({ onAdd }) {
  
  const { currentUser, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const name = currentUser?.displayName || "User";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-8 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <h1 className="text-xl font-bold tracking-tight">
        <span className="text-indigo-600">Fin</span>
        <span className="text-gray-900 dark:text-white">Track</span>
      </h1>

      <div className="flex items-center gap-6">
        
        <button
          onClick={onAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition"
        >
          + Add
        </button>

        <DarkModeToggle />

        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            {/* {currentUser?.email} */}
          </span>
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="font-medium"
            >
              {name}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-[#111827] shadow-lg rounded-xl p-2">
                <button
                  onClick={logout}
                  className="block px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
</div>

        </div>
      </div>
    </nav>
  );
}
