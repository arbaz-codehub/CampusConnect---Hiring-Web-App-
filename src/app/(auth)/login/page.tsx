"use client";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import Toast from "@/components/Toast";
import animationData from "../../../../public/animations/login-animationn.json";
import { Suspense } from "react";

export default function Login() {
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<loginErrorType>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    console.log("Auth state is ", authState);

    axios
      .post("/api/auth/login", authState)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 200) {
          console.log("User logged in");
          signIn("credentials", {
            email: authState.email,
            password: authState.password,
            callbackUrl: "/",
            redirect: true,
          });
        } else if (response.status == 400) {
          setErrors(response?.errors);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("Something went wrong!", err);
      });
  };

  const githubSignIn = async () => {
    await signIn("github", {
      callbackUrl: "/",
      redirect: false,
    });
  };

  const googleSignIn = async () => {
    await signIn("google", {
      callbackUrl: "/",
      redirect: false,
    });
  };

  return (
    <section className="h-screen flex items-center justify-center bg-white">
      <Suspense fallback={<div>Loading...</div>}>
        <Toast />
      </Suspense>
      <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-2xl overflow-hidden h-[90%] mx-4">
        {/* Left Side - Lottie Animation */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-50">
          <Lottie animationData={animationData} loop={true} className="w-4/5" />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-12 overflow-y-auto">
          <div className="text-center mb-8">
            <div className="w-[70%] h-16 mx-auto -mt-3 bg-[url('/Campus_connect3.svg')] bg-contain bg-no-repeat"></div>
            <p className="text-gray-600 mt-2">
              Sign in to continue to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="s_email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="s_email"
                placeholder="Enter your email.."
                onChange={(e) =>
                  setAuthState({ ...authState, email: e.target.value })
                }
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors?.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="s_pass"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="s_pass"
                placeholder="Enter your password.."
                onChange={(e) =>
                  setAuthState({ ...authState, password: e.target.value })
                }
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors?.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <a
                href="/forgot-password"
                className="text-sm text-gray-900 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-[#a8f68f] hover:bg-[#a8f68fa1] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-4">
              <button
                onClick={googleSignIn}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-[#a8f68f] hover:bg-[#a8f68fa1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <img
                  src="/google-icon.png"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Google
              </button>
              <button
                onClick={githubSignIn}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-[#a8f68f] hover:bg-[#a8f68fa1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <img
                  src="/github-icon.png"
                  alt="GitHub"
                  className="w-5 h-5 mr-2"
                />
                GitHub
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/register"
              className="text-sm text-gray-900 hover:underline"
            >
              Don't have an account? Register.
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
