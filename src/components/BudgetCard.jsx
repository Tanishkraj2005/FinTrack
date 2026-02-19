import React from 'react'

function BudgetCard({
  budget,
  monthlyExpense,
  onEdit,
}) {
  if (!budget) {
    return (
      <div className="card p-6 text-center">
        <p className="text-gray-500 mb-4">
          No monthly budget set.
        </p>
        <button
          onClick={onEdit}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Set Budget
        </button>
      </div>
    );
  }

  const percentage =
    (monthlyExpense / budget.limit) * 100;

  const remaining = budget.limit - monthlyExpense;

  let barColor = "bg-indigo-600";
  if (percentage >= 80 && percentage < 100)
    barColor = "bg-yellow-500";
  if (percentage >= 100)
    barColor = "bg-red-500";

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          Monthly Budget
        </h3>
        <button
          onClick={onEdit}
          className="text-indigo-600 text-sm"
        >
          Edit
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-2">
        Limit: ₹ {budget.limit}
      </p>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
        <div
          className={`${barColor} h-3 rounded-full`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <p className="text-sm">
        Used: ₹ {monthlyExpense} (
        {percentage.toFixed(1)}%)
      </p>

      <p className="text-sm mt-1">
        Remaining: ₹ {remaining}
      </p>
    </div>
  );
}

export default BudgetCard
