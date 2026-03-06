import React from "react";
import { Search, Filter, Tags } from "lucide-react";

function Filters({
  search,
  setSearch,
  category,
  setCategory,
  type,
  setType,
}) {
  return (
    <div className="glass-card p-4 flex flex-col md:flex-row gap-4 my-8 items-center bg-white/40 dark:bg-darksurface/40">

      {/* Search Input */}
      <div className="relative w-full md:w-1/3 group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-none ring-1 ring-gray-200 dark:ring-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all shadow-sm"
        />
      </div>

      <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden md:block" />

      {/* Category Dropdown */}
      <div className="relative w-full md:w-1/4 group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Tags className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full appearance-none pl-10 pr-8 py-2.5 rounded-xl border-none ring-1 ring-gray-200 dark:ring-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all shadow-sm text-gray-700 dark:text-gray-200 cursor-pointer"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Salary">Salary</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Freelance">Freelance</option>
          <option value="Business">Business</option>
          <option value="Investment">Investment</option>
          <option value="Gift">Gift</option>
          <option value="Other">Other</option>
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>

      {/* Type Dropdown */}
      <div className="relative w-full md:w-1/4 group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Filter className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full appearance-none pl-10 pr-8 py-2.5 rounded-xl border-none ring-1 ring-gray-200 dark:ring-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all shadow-sm text-gray-700 dark:text-gray-200 cursor-pointer"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>

    </div>
  );
}

export default Filters;
