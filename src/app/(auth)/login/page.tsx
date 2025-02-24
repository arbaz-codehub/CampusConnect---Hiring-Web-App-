"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";
import Toast from "@/components/Toast";

export default function Login() {
  const params = useSearchParams();

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

  // To Sign in with github
  const githubSignIn = async () => {
    await signIn("github", {
      callbackUrl: "/",
      redirect: false,
    });
  };

  // To sign in with google
  const googleSignIn = async () => {
    await signIn("google", {
      callbackUrl: "/",
      redirect: false,
    });
  };

  return (
    <>
      <section>
        <Toast />
        <div className="auth-container">
          <h1>Login Page</h1>
          {params.get("message") && <p>{params.get("message")}</p>}
          <form action="#" onSubmit={handleSubmit}>
            <label htmlFor="s_email">Email</label>
            <input
              type="email"
              id="s_email"
              placeholder="Enter your email.."
              onChange={(e) =>
                setAuthState({ ...authState, email: e.target.value })
              }
            />
            <span className="redError">{errors?.email}</span>

            <label htmlFor="s_pass">Password</label>
            <input
              type="password"
              id="s_pass"
              placeholder="Enter your password.."
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
            />
            <span className="redError">{errors?.password}</span>
            <a
              href="/forgot-password"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              Forgot Password?
            </a>

            <button type="submit">{loading ? "Processing" : "Login"}</button>
          </form>
          <div className="social-btns">
            <button type="submit" onClick={googleSignIn}>
              Google
            </button>
            <button type="submit" onClick={githubSignIn}>
              Github
            </button>
          </div>
          <Link href="/register">Don't have an account? Register.</Link>
        </div>
      </section>
    </>
  );
}
