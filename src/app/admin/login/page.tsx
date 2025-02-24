"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

export default function AdminLogin() {
  const router = useRouter();
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = await signIn("credentials", {
      email: authState.email,
      password: authState.password,
      redirect: false,
    });

    if (data?.status == 200) {
      router.replace("/admin/dashboard");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Toast />
      <div className="w-[500] shadow-md rounded-lg p-5">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p>Welcome Back Admin Bhaiii</p>
        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <label htmlFor="adminEmail" className="block">
              Email
            </label>
            <input
              type="email"
              name="adminEmail"
              id="adminEmail"
              placeholder="Enter your Email"
              className="w-full outline-red-300 p-2 h-10 rounded-md border"
              onChange={(e) =>
                setAuthState({ ...authState, email: e.target.value })
              }
            />
          </div>

          <div className="mt-5">
            <label htmlFor="adminPassword" className="block">
              Password
            </label>
            <input
              type="password"
              name="adminPassword"
              id="adminPassword"
              placeholder="Enter your Password"
              className="w-full outline-red-300 p-2 h-10 rounded-md border"
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
            />
          </div>

          <div className="mt-5">
            <button
              className="w-full bg-red-400 rounded-lg p-2 text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
