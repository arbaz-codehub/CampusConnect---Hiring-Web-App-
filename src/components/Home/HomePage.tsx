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
      <HeroSection />
    </ClickSpark>
  );
}
