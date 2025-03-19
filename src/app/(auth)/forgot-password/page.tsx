"use client";

import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<loginErrorType>();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/forgot-password", { email: email })
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 200) {
          toast.success(response.message, { theme: "colored" });
        } else if (response.status == 400) {
          setErrors(response.errors);
        } else if (response.status == 500) {
          toast.error(response.message, { theme: "colored" }); // Changed from success to error for 500 status
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("The error is", err);
        toast.error("Something went wrong!", { theme: "colored" }); // Added error toast for catch block
      });
  };

  return (
    <section className="h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 mx-4">
        <div className="text-center mb-8">
          <div className="w-[70%] h-16 mx-auto bg-[url('/Campus_connect3.svg')] bg-contain bg-no-repeat"></div>
          <h1 className="text-2xl font-bold mt-4">Forgot Password?</h1>
          <p className="text-gray-600 mt-2">
            Don't worry, it happens. Just enter your email below, and we'll send
            you a reset link.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors?.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-[#a8f68f] hover:bg-[#a8f68fa1] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-gray-900 hover:underline">
            Remember your password? Login.
          </Link>
        </div>
      </div>
      <ToastContainer /> {/* Added ToastContainer component */}
    </section>
  );
}
