import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Plus } from "lucide-react";

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
    <div className="min-h-screen relative overflow-hidden bg-background dark:bg-darkbg text-gray-800 dark:text-gray-200 selection:bg-primary/30 antialiased">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 bg-mesh dark:bg-mesh-dark opacity-40 pointer-events-none w-full h-full" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl mix-blend-multiply animate-blob pointer-events-none" />
      <div className="fixed top-20 right-1/3 w-72 h-72 bg-secondary/20 dark:bg-secondary/10 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000 pointer-events-none" />
      <div className="fixed -bottom-32 left-1/3 w-80 h-80 bg-rose-300/20 dark:bg-rose-900/10 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000 pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar onAdd={() => setIsOpen(true)} />

        <main className="flex-grow max-w-6xl w-full mx-auto p-6 space-y-8 pb-32">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Summary */}
            <SummaryCards transactions={transactions} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Budget Card */}
            <BudgetCard
              budget={budget}
              monthlyExpense={monthlyExpense}
              onEdit={() => setBudgetOpen(true)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Charts */}
            <ChartsSection transactions={transactions} />
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Filters
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              type={type}
              setType={setType}
            />
          </motion.div>

          {/* Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <TransactionList
              transactions={filtered}
              onEdit={(t) => {
                setEditData(t);
                setIsOpen(true);
              }}
              onDelete={deleteTransaction}
            />
          </motion.div>
        </main>

        {/* Floating Add Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-primary to-indigo-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] z-40"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <TransactionModal
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
              setEditData(null);
            }}
            onSave={handleSave}
            editData={editData}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {budgetOpen && (
          <BudgetModal
            isOpen={budgetOpen}
            onClose={() => setBudgetOpen(false)}
            onSave={setMonthlyBudget}
            existingLimit={budget?.limit}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
