// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "wsei-frontend.firebaseapp.com",
  projectId: "wsei-frontend",
  storageBucket: "wsei-frontend.firebasestorage.app",
  messagingSenderId: "238873225901",
  appId: "1:238873225901:web:00e5f790f6c125d0e6b424",
  measurementId: "G-G1WSWMWPND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);