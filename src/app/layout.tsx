import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}

/*
Ye layout.tsx file Next.js application ka root layout define karta hai. Iska matlab ye hai ki ye layout pure application me common rahega.

Code breakdown line by line:

1. Imports:
- Metadata type Next.js se import kiya hai jo page metadata set karne ke liye use hota hai
- Geist aur Geist_Mono fonts Google fonts se import kiye hai
- globals.css import kiya hai jisme global CSS styles hai
- NextAuthProvider authentication ke liye import kiya hai

2. Font Setup:
- geistSans variable me Geist font ko configure kiya hai:
  - variable CSS variable name set karta hai (--font-geist-sans)
  - subsets me "latin" specify kiya hai jo font ka subset hai

- geistMono variable me Geist Mono font ko same tarah configure kiya hai
  - ye monospace font hai jo generally code display karne ke liye use hota hai

3. Metadata Configuration:
- metadata object me page ka title aur description set kiya hai
- ye information SEO aur browser tab me dikhane ke liye use hoti hai

4. RootLayout Component:
- ye function component hai jo pure application ka base layout provide karta hai
- children prop receive karta hai jo nested pages/components ko represent karta hai
- Readonly type ka use React me ek best practice hai:
  - Ye ensure karta hai ki children prop accidentally modify na ho sake
  - React me props immutable hone chahiye, kyuki components pure functions ki tarah behave karte hai
  - Agar props modify honge to React ka reconciliation process affect ho sakta hai aur unexpected behavior ho sakta hai
  - TypeScript me Readonly type se ye guarantee milti hai ki props read-only rahenge

5. Return Structure:
- html tag with "en" language
- body tag me font variables ko className me set kiya hai taki pure app me ye fonts available ho
- antialiased class text ko smooth render karne ke liye hai
- NextAuthProvider ke andar children render kiye hai taki authentication pure app me available ho

Overall ye code application ka foundation set karta hai - fonts, layout structure, authentication wrapper aur global styles ke sath.
*/
