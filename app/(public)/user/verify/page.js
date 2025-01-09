"use client";

import { getAuth, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Verify() {
  const auth = getAuth();
  const router = useRouter();

  const [resendMessage, setResendMessage] = useState("");
  const [error, setError] = useState("");

  const handleResendVerification = () => {
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          setResendMessage("Verification email has been resent. Please check your inbox.");
          setError(""); // Clear any previous errors
        })
        .catch((err) => {
          setError("Failed to resend the verification email. Please try again.");
          console.error(err);
        });
    } else {
      setError("You are not logged in. Please log in to resend the verification email.");
    }
  };

  const handleGoToLogin = () => {
    redirect("/user/login"); // Przekierowanie do strony logowania
  };

  return (
    <section className="bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Verify Your Email</h1>
        <p className="text-gray-600 mb-6">
          A verification email has been sent to your inbox. Please verify your email address to continue.
        </p>

        {/* Alert błędu */}
        {error && (
          <div className="text-red-500 bg-red-100 p-4 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Komunikat o wysłaniu ponownie e-maila */}
        {resendMessage && (
          <div className="text-green-500 bg-green-100 p-4 rounded-md mb-4">
            {resendMessage}
          </div>
        )}

        <button
          onClick={handleResendVerification}
          className="inline-block w-full rounded-md border border-blue-600 bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 mb-4"
        >
          Resend Verification Email
        </button>

        <button
          onClick={handleGoToLogin}
          className="inline-block w-full rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring active:bg-gray-200"
        >
          Back to Login
        </button>
      </div>
    </section>
  );
}
