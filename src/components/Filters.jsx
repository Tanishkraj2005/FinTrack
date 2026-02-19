import React from "react";

function Filters({
  search,
  setSearch,
  category,
  setCategory,
  type,
  setType,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex flex-wrap gap-4 my-6">
      <input
        type="text"
        placeholder="Search title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-3 py-2 rounded-lg border w-full md:w-auto"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3 py-2 rounded-lg border"
      >
        <option value="">All Categories</option>
        <option>Food</option>
        <option>Salary</option>
        <option>Shopping</option>
        <option>Travel</option>
      </select>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="px-3 py-2 rounded-lg border"
      >
        <option value="">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
  );
}

export default Filters;
