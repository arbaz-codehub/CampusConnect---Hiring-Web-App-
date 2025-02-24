import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/*
Ye code Next.js me authentication implement karne ke liye hai. Iska breakdown kuch aise hai:

1. Imports:
- "NextAuth" next-auth library se import kiya hai jo authentication ka main package hai
- "GithubProvider" GitHub se login karane ke liye import kiya hai
- "authOptions" local options file se import kiya hai jisme authentication ke configuration hai

2. Handler creation:
- "const handler = NextAuth(authOptions)" - NextAuth function ko authOptions ke sath call karke ek handler banaya hai
  jo authentication requests ko handle karega

3. Exports:
- "export { handler as GET, handler as POST }" - Same handler ko GET aur POST requests ke liye export kiya hai
  kyunki authentication ke liye dono type ke requests handle karne padte hai
  - GET: Login page, user info etc ke liye
  - POST: Login/logout actions ke liye

Overall ye code Next.js ke API route me authentication setup kar raha hai jisse users login/logout kar payenge


/*
NextAuth handler ki jarurat aur working samajhte hain:

1. Handler ki jarurat kyu padi?
- NextAuth ko API endpoints chahiye hote hain authentication requests handle karne ke liye
- Ye handler NextAuth ke saare operations handle karta hai jaise:
  * Login requests
  * Session management 
  * Token verification
  * Social login redirects
  * Callback URLs
- Basically ye ek central point hai jahan se saari auth related requests process hoti hain

2. GET aur POST dono kyu export kiye?
- Authentication me different types ki requests aati hain:
  * GET requests:
    - Session check karne ke liye
    - User info fetch karne ke liye 
    - Login page pe redirect ke liye
    - OAuth providers ke callbacks ke liye
  * POST requests:
    - Login credentials submit karne ke liye
    - Logout karne ke liye
    - Token refresh karne ke liye
    - Session update karne ke liye

3. Pages ko kaise pata chalta hai konsa handler use karna hai?
- Next.js ka API routes system automatically detect karta hai:
  * Agar page se fetch() ya axios.get() call hua to GET handler use hoga
  * Agar form submit ya axios.post() call hua to POST handler use hoga
- Example:
  * Login form submit -> POST request -> POST handler
  * Page load pe session check -> GET request -> GET handler

4. [...nextauth] folder name ka matlab:
- Ye catch-all route hai jo /api/auth/ ke baad ki saari requests catch karega
- Examples:
  * /api/auth/signin -> signin ke liye
  * /api/auth/callback/github -> GitHub login callback ke liye
  * /api/auth/session -> session check ke liye
*/
