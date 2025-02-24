"use client";

import React from "react";
import { signOut } from "next-auth/react";

export default function SignOutBtn({ type }: { type?: string }) {
  return (
    <div>
      <button
        className="bg-orange-300 rounded-md p-2"
        onClick={() =>
          signOut({
            callbackUrl: type == "Admin" ? "/admin/login" : "/login",
            redirect: true,
          })
        }
      >
        SignOut Button
      </button>
    </div>
  );
}

/*
Ye code ek SignOut button component create kr raha hai jo user ko logout krne ke liye use hota hai.

Line by line explanation:

1. "use client"
   - Ye line batati hai ki ye component client side pe render hoga
   - Browser me chalega, server side pe nahi

2. import statements:
   - React ko import kiya hai component banane ke liye
   - next-auth/react se signOut function import kiya hai jo logout functionality provide karta hai

3. SignOutBtn function component:
   - Default export hai yani dusri files me direct import ho sakta hai
   - Ek simple component hai jo button return karta hai

4. Return statement me:
   - Div ke andar ek button hai
   - Button ko styling di hai:
     * bg-orange-300: orange background color
     * rounded-md: rounded corners
     * p-2: padding on all sides
   
5. onClick handler:
   - Button pe click hone par signOut function call hoga
   - signOut ko 2 options diye gaye hain:
     * callbackUrl: "/login" - logout ke baad login page pe redirect hoga
     * redirect: true - automatic redirect enable hai

Is tarah ye component ek styled button provide karta hai jo user ko system se logout kr sakta hai aur login page pe redirect kr deta hai.
*/
