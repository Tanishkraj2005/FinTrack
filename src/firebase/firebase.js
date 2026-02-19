import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8jzjAFQNbQOaYfQC0PxJdTVNEDlwpMe4",
  authDomain: "fitness-tracker-9eaff.firebaseapp.com",
  projectId: "fitness-tracker-9eaff",
  storageBucket: "fitness-tracker-9eaff.firebasestorage.app",
  messagingSenderId: "995756272389",
  appId: "1:995756272389:web:050363d7f4dfb94d1e656c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
