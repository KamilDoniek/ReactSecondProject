"use client";

import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/app/lib/AuthContext";

export default function Home() {
  const { user } = useAuth(); 

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to the App</h1>

      {user ? (
        <div className="flex flex-col items-center">
          <UserAvatar size={100} />
          <p className="mt-4 text-xl text-gray-600">
            Welcome back, {user.displayName || "User"}!
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
