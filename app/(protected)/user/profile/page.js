"use client";

import { useRouter } from "next/navigation";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "@/app/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function ProfileForm() {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

  if (!user) {
    return <p>Loading...</p>;
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
      street: "",
      city: "",
      zipCode: "",
    },
  });

  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      await updateProfile(user, {
        displayName: data.displayName,
        photoURL: data.photoURL,
      });

      await setDoc(doc(db, "users", user?.uid), {
        address: {
          street: data.street,
          city: data.city,
          zipCode: data.zipCode,
        },
      });

      console.log("Profile and address updated successfully");
      setError("");
      router.push("/");
    } catch (e) {
      console.error("Error updating profile or address:", e);
      setError("Nie masz uprawnień do zapisywania danych.");
    }
  };

  return (
    <section className="bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

        {error && (
          <div className="text-red-500 bg-red-100 p-4 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
          {/* Display Name */}
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
              Display Name
            </label>
            <input
              {...register("displayName", { required: "Display name is required" })}
              type="text"
              id="displayName"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            <p className="text-red-500">{errors.displayName?.message}</p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              readOnly
              className="mt-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              {...register("photoURL", { required: "Photo URL is required" })}
              type="url"
              id="photoURL"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            <p className="text-red-500">{errors.photoURL?.message}</p>
          </div>

          {/* Street */}
          <div>
            <label htmlFor="street" className="block text-sm font-medium text-gray-700">
              Street
            </label>
            <input
              {...register("street", { required: "Street is required" })}
              type="text"
              id="street"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            <p className="text-red-500">{errors.street?.message}</p>
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              {...register("city", { required: "City is required" })}
              type="text"
              id="city"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            <p className="text-red-500">{errors.city?.message}</p>
          </div>

          {/* ZIP Code */}
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              ZIP Code
            </label>
            <input
              {...register("zipCode", { required: "ZIP Code is required" })}
              type="text"
              id="zipCode"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            <p className="text-red-500">{errors.zipCode?.message}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md border border-blue-600 bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
}
