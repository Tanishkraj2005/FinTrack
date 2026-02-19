import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";

export default function TransactionModal({
  isOpen,
  onClose,
  onSave,
  editData,
}) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  const expenseCategories = [
    "Food",
    "Shopping",
    "Travel",
    "Bills",
    "Entertainment",
    "Health",
    "Other",
  ];

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Gift",
    "Other",
  ];

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title,
        amount: editData.amount,
        category: editData.category,
        type: editData.type,
        date: new Date(editData.date.seconds * 1000)
          .toISOString()
          .split("T")[0],
      });
    }
  }, [editData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.amount || !form.category || !form.date)
      return;

    onSave({
      ...form,
      amount: Number(form.amount),
      date: Timestamp.fromDate(new Date(form.date)),
    });

    setForm({
      title: "",
      amount: "",
      category: "",
      type: "expense",
      date: "",
    });

    onClose();
  };

  const categories =
    form.type === "income"
      ? incomeCategories
      : expenseCategories;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-[#111827] p-6 rounded-2xl shadow-xl w-full max-w-md">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-6">
          {editData ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="px-4 py-2 rounded-lg border"
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            className="px-4 py-2 rounded-lg border"
          />

          {/* Type Dropdown */}
          <select
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
                category: "", // reset category when type changes
              })
            }
            className="px-4 py-2 rounded-lg border"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Category Dropdown */}
          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="px-4 py-2 rounded-lg border"
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            className="px-4 py-2 rounded-lg border"
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Save
          </button>

        </form>
      </div>
    </div>
  );
}
