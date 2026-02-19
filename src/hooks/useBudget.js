import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function useBudget() {
  const { currentUser } = useAuth();
  const [budget, setBudget] = useState(null);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "monthlyBudget"),
      where("uid", "==", currentUser.uid),
      where("month", "==", currentMonth),
      where("year", "==", currentYear)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setBudget({
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data(),
        });
      } else {
        setBudget(null);
      }
    });

    return unsubscribe;
  }, [currentUser]);

  const setMonthlyBudget = async (limit) => {
    if (!currentUser) return;

    if (budget) {
      await updateDoc(doc(db, "monthlyBudget", budget.id), {
        limit: Number(limit),
      });
    } else {
      await addDoc(collection(db, "monthlyBudget"), {
        uid: currentUser.uid,
        month: currentMonth,
        year: currentYear,
        limit: Number(limit),
      });
    }
  };

  return { budget, setMonthlyBudget };
}
