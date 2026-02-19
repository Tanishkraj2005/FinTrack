import React, { useState, useEffect } from "react";

function BudgetModal({
  isOpen,
  onClose,
  onSave,
  existingLimit,
}) {
  const [limit, setLimit] = useState("");

  useEffect(() => {
    if (existingLimit) {
      setLimit(existingLimit);
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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Set Monthly Budget
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="number"
            placeholder="Enter monthly limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="px-4 py-2 rounded-lg border"
          />

          <button className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default BudgetModal;
