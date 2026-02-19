import { useState } from "react";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import ChartsSection from "../components/ChartsSection";
import Filters from "../components/Filters";
import TransactionList from "../components/TransactionList";
import TransactionModal from "../components/TransactionModal";
import useTransactions from "../hooks/useTransactions";
import useBudget from "../hooks/useBudget";
import BudgetCard from "../components/BudgetCard";
import BudgetModal from "../components/BudgetModal";

export default function Dashboard() {

  // 🔹 Transactions Hook FIRST
  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  // 🔹 Budget Hook
  const { budget, setMonthlyBudget } = useBudget();
  const [budgetOpen, setBudgetOpen] = useState(false);

  // 🔹 Current Month Calculation
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpense = transactions
    .filter((t) => {
      const date = new Date(t.date.seconds * 1000);
      return (
        t.type === "expense" &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  // 🔹 Transaction Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // 🔹 Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const filtered = transactions.filter((t) => {
    return (
      t.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? t.category === category : true) &&
      (type ? t.type === type : true)
    );
  });

  // 🔹 Save Transaction
  const handleSave = (data) => {
    if (editData) {
      updateTransaction(editData.id, data);
      setEditData(null);
    } else {
      addTransaction(data);
    }
  };

  return (
    <div>
      <Navbar onAdd={() => setIsOpen(true)} />

      <div className="max-w-6xl mx-auto p-6 space-y-8">

        {/* Summary */}
        <SummaryCards transactions={transactions} />

        {/* Budget Card */}
        <BudgetCard
          budget={budget}
          monthlyExpense={monthlyExpense}
          onEdit={() => setBudgetOpen(true)}
        />

        {/* Charts */}
        <ChartsSection transactions={transactions} />

        {/* Filters */}
        <Filters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          type={type}
          setType={setType}
        />

        {/* Transactions */}
        <TransactionList
          transactions={filtered}
          onEdit={(t) => {
            setEditData(t);
            setIsOpen(true);
          }}
          onDelete={deleteTransaction}
        />
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full text-2xl shadow-lg hover:bg-indigo-700 transition"
      >
        +
      </button>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditData(null);
        }}
        onSave={handleSave}
        editData={editData}
      />

      {/* Budget Modal */}
      <BudgetModal
        isOpen={budgetOpen}
        onClose={() => setBudgetOpen(false)}
        onSave={setMonthlyBudget}
        existingLimit={budget?.limit}
      />
    </div>
  );
}
