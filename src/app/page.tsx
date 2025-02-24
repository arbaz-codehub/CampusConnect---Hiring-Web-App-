"use client";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <section className="home-section">
      <div className="auth-container bg-purple-300 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white">Home Page</h1>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
          onClick={() => signIn()}
        >
          Join
        </button>
      </div>
    </section>
  );
}

/*
Ye code Next.js ka Home page hai jo authentication ke sath protect kiya gaya hai. Iska main kaam ye hai ki sirf logged-in users ko page access karne de, warna unko login page par redirect kar de.

Code ka breakdown:

1. Imports:
- SignOutBtn: Logout button component import kiya hai
- getServerSession: Next-auth se session check karne ke liye
- authOptions: Authentication configuration
- redirect: Next.js ka navigation function

2. Home Component:
- async function hai kyunki server-side session check karna hai
- getServerSession() se current user ka session check karta hai
- Agar session nahi hai (user logged in nahi hai) to login page par redirect kar deta hai

3. UI Structure:
- section tag me main content wrap kiya hai
- auth-container div me purple background color diya hai
- Home Page heading display karta hai
- JSON.stringify(session) se user ka session data display karta hai
- SignOutBtn component add kiya hai jisse user logout kar sake

Overall ye ek protected route hai jo authentication ke bina access nahi ho sakta, aur logged-in users ko unka session data dikhata hai with logout functionality.
*/
