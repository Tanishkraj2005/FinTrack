import React from "react";

function TransactionCard({ transaction, onEdit, onDelete }) {
  return (
    <div className="card p-5 flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">
          {transaction.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {transaction.category}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <span
          className={`font-semibold text-lg ${
            transaction.type === "income"
              ? "text-emerald-500"
              : "text-rose-500"
          }`}
        >
          ₹ {transaction.amount}
        </span>

        <button
          onClick={() => onEdit(transaction)}
          className="text-indigo-600 hover:underline text-sm"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(transaction.id)}
          className="text-rose-500 hover:underline text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TransactionCard;
