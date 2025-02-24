"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Register() {
  const router = useRouter();

  const [authState, setAuthState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    userRole: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<registerErrorType>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    console.log("Auth state is ", authState);
    axios
      .post("/api/auth/register", authState)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 200) {
          console.log("User signed up");
          router.push(`/login?message=${response.message}`);
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
    <section>
      <div className="auth-container">
        <h1>Register Page</h1>
        <form action="#" onSubmit={handleSubmit}>
          <label htmlFor="s_name">Name</label>
          <input
            type="text"
            id="s_name"
            placeholder="Enter your name.."
            onChange={(e) =>
              setAuthState({ ...authState, name: e.target.value })
            }
          />
          <span className="redError">{errors?.name}</span>

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

          <label htmlFor="s_cfpass">Confirm Password</label>
          <input
            type="password"
            id="s_cfpass"
            placeholder="Confirm your password.."
            onChange={(e) =>
              setAuthState({
                ...authState,
                password_confirmation: e.target.value,
              })
            }
          />

          <div className="mt-4 mb-4">
            <label
              htmlFor="userRole"
              className="block text-sm font-medium text-gray-700"
            >
              Select Role
            </label>
            <select
              id="userRole"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
              onChange={(e) =>
                setAuthState({ ...authState, userRole: e.target.value })
              }
              defaultValue=""
            >
              <option value="" disabled>
                Select your role before login
              </option>
              <option value="Student">Student</option>
              <option value="Company">Company</option>
            </select>
          </div>

          <button type="submit">{loading ? "Processing" : "Register"}</button>
        </form>
        <div className="social-btns">
          <button type="submit" onClick={googleSignIn}>
            Google
          </button>
          <button type="submit" onClick={githubSignIn}>
            Github
          </button>
        </div>
        <Link href="/login">Already have an account? Login.</Link>
      </div>
    </section>
  );
}

/*
Ye code ek registration page ka component hai jo new users ko signup karne ki functionality provide karta hai.

Pura Overview:
- User registration form provide karta hai name, email, password ke sath
- Form validation handle karta hai
- Google aur Github se social login ki facility deta hai
- Loading states aur error messages ko manage karta hai

Line by line explanation:

1. "use client" - ye batata hai ki ye client-side component hai

2. Imports:
   - axios: API calls ke liye
   - Link: Next.js navigation ke liye
   - useState: state management ke liye
   - useRouter: programmatic navigation ke liye
   - signIn: social authentication ke liye

3. Register component:
   - useRouter hook initialize kiya routing ke liye
   
4. State management:
   - authState: form ka data store karne ke liye (name, email, password, confirm password)
   - loading: form submission status track karne ke liye
   - errors: validation errors store karne ke liye

5. handleSubmit function:
   - Form submit pe trigger hota hai
   - axios se API call karta hai /api/auth/register endpoint pe
   - Success pe login page pe redirect karta hai
   - Error case me errors state update karta hai

6. Social login functions:
   - githubSignIn: Github se login ke liye
   - googleSignIn: Google se login ke liye
   - Dono me signIn function use hua hai with callback URL

7. Return section (UI):
   - Form elements with labels and inputs
   - Har input ke sath error message display ka provision
   - Loading state ke hisab se button text change hota hai
   - Social login buttons
   - Login page ka link for existing users

8. Form inputs:
   - Har input ke sath onChange handler hai jo authState update karta hai
   - spread operator (...authState) use hua hai existing state preserve karne ke liye
   - Password confirmation field bhi include hai

9. Error handling:
   - Har field ke niche error message show karne ka provision hai
   - redError class use hui hai styling ke liye

Ye component proper form validation, error handling, aur multiple authentication methods provide karta hai, jo ek secure aur user-friendly registration system ke liye zaruri hai.
*/
