"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MissingField() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [myUserRole, setMyUserRole] = useState<"Student" | "Company" | "">("");

  const updateUserRole = async () => {
    if (!session?.user?.email) return;

    const res = await fetch("/api/auth/update-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email,
        userRole: myUserRole,
      }),
    });

    if (res.ok) {
      const data = await res.json();

      // Update session userRole using update()
      await update({
        user: {
          ...session.user,
          userRole: data.userRole,
        },
      });

      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Select Your Role
        </h1>
        <div className="mb-6">
          <select
            value={myUserRole}
            onChange={(e) =>
              setMyUserRole(e.target.value as "Student" | "Company")
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="Company">Company</option>
          </select>
        </div>
        <button
          type="submit"
          onClick={updateUserRole}
          disabled={!myUserRole}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
