import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Konfiguracja Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "wsei-frontend.firebaseapp.com",
  projectId: "wsei-frontend",
  storageBucket: "wsei-frontend.firebasestorage.app",
  messagingSenderId: "238873225901",
  appId: "1:238873225901:web:00e5f790f6c125d0e6b424",
  measurementId: "G-G1WSWMWPND",
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;