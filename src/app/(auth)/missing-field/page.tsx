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
    <section className="h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 mx-4">
        <div className="text-center mb-8">
          <div className="w-[70%] h-16 mx-auto bg-[url('/Campus_connect3.svg')] bg-contain bg-no-repeat"></div>
          <h1 className="text-2xl font-bold mt-4">Select Your Role</h1>
          <p className="text-gray-600 mt-2">
            Please select your role to continue.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="userRole"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="userRole"
              value={myUserRole}
              onChange={(e) =>
                setMyUserRole(e.target.value as "Student" | "Company")
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Role</option>
              <option value="Student">Student</option>
              <option value="Company">Company</option>
            </select>
          </div>

          <button
            type="button"
            onClick={updateUserRole}
            disabled={!myUserRole}
            className="w-full px-4 py-2 bg-[#a8f68f] hover:bg-[#a8f68fa1] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}
