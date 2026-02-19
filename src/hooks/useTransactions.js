import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function useTransactions() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "transactions"),
      where("uid", "==", currentUser.uid),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTransactions(
        snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }))
      );
    });

    return unsubscribe;
  }, [currentUser]);

  const addTransaction = async (data) => {
    if (!currentUser) return;

    await addDoc(collection(db, "transactions"), {
      ...data,
      uid: currentUser.uid,
    });
  };

  const updateTransaction = async (id, data) => {
    await updateDoc(doc(db, "transactions", id), data);
  };

  const deleteTransaction = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
  };

  const resetAllTransactions = async () => {
    if (!currentUser) return;

    const q = query(
      collection(db, "transactions"),
      where("uid", "==", currentUser.uid)
    );

    const snapshot = await getDocs(q);

    const deletePromises = snapshot.docs.map((docItem) =>
      deleteDoc(doc(db, "transactions", docItem.id))
    );

    await Promise.all(deletePromises);
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    resetAllTransactions,
  };
}
