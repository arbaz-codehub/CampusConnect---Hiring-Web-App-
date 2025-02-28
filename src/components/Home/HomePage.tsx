"use client";

import ClickSpark from "../third-party/ClickSpark";
import HeroSection from "../ui/HeroSection1/HeroSection";

export default function HomePage() {
  return (
    <ClickSpark
      sparkColor="#000"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      {/* <section className="home-section">
        <div className="auth-container bg-purple-300 p-4 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-white">Home Page</h1>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
            onClick={() => signIn()}
          >
            Join
          </button>
        </div>
      </section> */}
      <HeroSection />
    </ClickSpark>
  );
}
