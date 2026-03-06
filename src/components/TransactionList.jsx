import TransactionCard from "./TransactionCard";
import { motion, AnimatePresence } from "framer-motion";

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence>
        {transactions.map((t) => (
          <TransactionCard
            key={t.id}
            transaction={t}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {transactions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-10 text-gray-500"
          >
            No transactions found.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
