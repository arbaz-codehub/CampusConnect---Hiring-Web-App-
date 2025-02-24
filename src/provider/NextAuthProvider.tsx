"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children?: React.ReactNode;
}

export default function NextAuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

/*
Ye code NextAuth authentication ke liye provider component create kr raha hai.

Line by line explanation:

1. "use client" - ye line batati hai ki ye client side component hai, yani browser me chalega. SessionProvider ko client side component hona zaroori hai kyunki ye browser me user ke session ko manage karta hai, events handle karta hai, aur real-time updates provide karta hai. Server side pe ye functionality possible nahi hai kyunki waha pe user ke actions par respond nahi kar sakta - jaise ki click events, form submissions, ya real-time session updates. Server sirf static content generate kar sakta hai.

2. import React - React library ko import kiya hai component banane ke liye

3. import SessionProvider - next-auth se SessionProvider component import kiya hai jo authentication state manage karega

4. interface Props - Interface ki jarurat isliye padi kyuki:
   - TypeScript me props ka type define karna important hai taki code type-safe rahe
   - Isse hum clearly bata sakte hai ki component ko kaun se props mil sakte hai
   - children? prop optional hai (? ka matlab optional) kyuki ho sakta hai component ke andar kuch content na ho
   - React.ReactNode type batata hai ki children me koi bhi valid React content aa sakta hai - text, elements, components etc
   - Ye interface NextAuthProvider component ko type safety deta hai taki galat props pass na ho sake

5. NextAuthProvider function - main component hai jo:
   - Props type ke children parameter leta hai
   - SessionProvider ke andar children ko wrap karke return karta hai
   
SessionProvider ka use authentication state ko pure app me available karane ke liye kiya gaya hai. Isse child components me authentication related data access kar sakte hai.
*/
