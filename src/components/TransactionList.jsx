import TransactionCard from "./TransactionCard";

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex flex-col gap-4">
      {transactions.map((t) => (
        <TransactionCard
          key={t.id}
          transaction={t}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
