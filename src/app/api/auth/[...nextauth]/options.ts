import { AuthOptions, ISODateString, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/db/mongo.config";
import { User as MyUser } from "@/model/User";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  avatar?: string | null;
  userRole?: string | null;
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        dbConnect();
        const findUser = await MyUser.findOne({ email: user.email });

        if (findUser) {
          return true;
        }
        if (!findUser) {
          await MyUser.create({
            name: user.name,
            email: user.email,
            role: "User",
            userRole: findUser?.userRole || "", // Get userRole from database if available
          });
        }
        return true;
      } catch (error) {
        console.log("Sign in error", error);
        return false;
      }
    },

    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user: CustomUser;
      trigger?: "signIn" | "signUp" | "update";
      session?: CustomSession;
    }) {
      if (trigger === "update") {
        token.userRole = session?.user?.userRole;
      }
      if (user) {
        // dbConnect();
        const findUser = await MyUser.findOne({ email: user.email });
        return {
          ...token,
          role: findUser?.role || "User",
          userRole: findUser?.userRole || "",
        };
      }
      console.log("token callback", token, user);
      return token;
    },

    async session({ session, token }: { session: CustomSession; token: JWT }) {
      // session.user = token.user as CustomUser;
      // session.user.userRole = (token.user as CustomUser).userRole;

      console.log("session callback", session, token);
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
          userRole: token.userRole,
        },
      };
    },

    async redirect({ url, baseUrl }) {
      if (url.includes("/login")) {
        return `${baseUrl}/`;
      }
      return url;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Next Auth Login Page",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email..",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        dbConnect();
        const user = await MyUser.findOne({ email: credentials?.email });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            ...user.toObject(),
            userRole: user.userRole || "Student", // Include userRole in returned object
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

/*
For /missing-field functionality, you'll need to create these files:

1. src/app/missing-field/page.tsx:
   - Main page component with form to select userRole
   - Form with dropdown for Student/Company selection
   - Submit handler to call API

2. src/app/api/auth/update-role/route.ts:
   - API endpoint to update user's role 
   - Handles POST request with new role
   - Updates MongoDB user document

Here's the structure for each file:

src/app/missing-field/page.tsx:



/*
Changes needed in this file:

1. In signIn callback, modify the MyUser.create() call to not set a default userRole:

Before:
await MyUser.create({
  name: user.name,
  email: user.email,
  role: "User",
  userRole: "Student", // Remove this default
});

After:
await MyUser.create({
  name: user.name, 
  email: user.email,
  role: "User",
  userRole: "", // Empty string instead of default
});

2. In jwt callback, remove the default "Student" assignment:

Before:
user.userRole = user?.userRole == null ? "Student" : user?.userRole;

After:
user.userRole = user?.userRole || ""; // Empty string if null/undefined

Changes needed in middleware.ts:

1. Add a new protected route for missing fields:
const missingFieldsRoute = "/missing-field";

2. Add check for empty userRole after token validation:
if (token && (user?.userRole === "" || user?.userRole === null)) {
  // Don't redirect if already on missing-field route
  if (pathname !== missingFieldsRoute) {
    return NextResponse.redirect(
      new URL("/missing-field", request.url)
    );
  }
}

3. Add missingFieldsRoute to exceptions (like login):
if (pathname == "/login" || pathname == "/admin/login" || pathname == "/missing-field") {
  return NextResponse.next();
}



// This way:
// - Social login users will have empty userRole
// - They'll be redirected to /missing-field if userRole is empty
// - After filling userRole on /missing-field, they can access protected routes
// */

/*
/missing-field page banane ke liye ye steps follow krne honge:

1. Page create krna (src/app/missing-field/page.tsx):
   - Form component banayenge userRole select krne ke liye
   - Dropdown me Student/Company options honge
   - Submit pe API call krke userRole update hoga
   - Success pe home page pe redirect hoga

2. API route banani hai (src/app/api/user/update-role/route.ts):
   - POST request handle kregi
   - Request body me userRole aayega
   - MongoDB me user ka userRole update krega
   - Success response return krega

3. Form validation add krni hai:
   - userRole required hona chahiye
   - Sirf Student/Company values allow ho
   - Empty submission na ho sake

4. Error handling add krna hai:
   - API errors handle krne honge
   - Validation errors show krne honge
   - Network errors handle krne honge

5. Authorization check:
   - Sirf logged in users access kr sake
   - Token validation
   - Role update sirf khud ka kr sake

6. UI/UX improvements:
   - Loading states
   - Success/error messages
   - Proper styling
   - Mobile responsive

7. Redirect logic:
   - Success pe proper redirect
   - Cancel pe previous page
   - Invalid access pe login page

8. Testing:
   - API testing
   - Form validation testing  
   - Auth flow testing
   - Error cases testing
*/

/*
User role ke liye aapko multiple files me changes krne honge:

1. User Model me (model/User.ts):
   - Schema me role field add krna hoga:
     role: {
       type: String,
       enum: ['Student', 'Company'], // Sirf ye 2 values allow hongi
       required: true
     }

2. Register API me (api/auth/register/route.ts):
   - registerSchema me role validation add krni hogi:
     role: vine.string().oneOf(['Student', 'Company'])
   
   - Interface me role add krna hoga:
     interface UserPayload {
       name: string
       email: string 
       password: string
       role: string
     }
   
   - User create krte time role pass krna hoga:
     await User.create({
       ...output,
       role: output.role
     })

3. Login API me (api/auth/login/route.ts):
   - User object me role field bhi return krna hoga response me
   - JWT token me role include krna hoga

4. NextAuth options me (current file):
   - authorize function me password check ke baad role bhi return krna hoga
   - session me role add krna hoga
   - JWT me role store krna hoga

5. Frontend me:
   - Register form me role select dropdown add krna hoga
   - Login ke baad role based routing implement krni hogi
   - Role based UI components show/hide krne honge

Main changes in code structure:
- User model me role field
- Registration me role validation
- Login me role return
- Session/JWT me role store
- Frontend me role based logic

Security considerations:
- Role field ko properly validate krna
- Frontend se role manipulation na ho sake
- API routes me role based access control
- Session me role verify krna
*/

/*
Ye code Next.js application me authentication setup kr raha hai. Isme 3 types ke authentication providers hai:
1. Credentials (email/password)
2. GitHub
3. Google

Code ka breakdown:

1. Imports:
- next-auth se AuthOptions import kiya hai jo authentication configuration ke liye use hota hai
- CredentialsProvider email/password based login ke liye
- dbConnect database connection ke liye
- MyUser model database operations ke liye
- GitHubProvider aur GoogleProvider social login ke liye

2. authOptions object:
- pages: NextAuth me custom pages ka configuration hai jisme sirf "/login" set kiya hai kyuki:
  * "/login" page authentication ke liye main entry point hai
  * Register page ko explicitly set karne ki zarurat nahi hai kyuki:
    - Register flow authentication ka part nahi hai, wo sirf new user create karta hai
    - Register ke baad user ko login page pe redirect kiya jata hai
    - NextAuth sirf authentication (login/signout) handle karta hai, registration nahi
  
  * pages configuration optional hai:
    - Agar nahi set karte to NextAuth apne default pages use karta hai
    - Lekin custom pages banane se:
      - Better user experience - apne app ke design ke according pages
      - More control - custom validation, error handling
      - Better integration - apne app ke flow ke according login/auth process
      
- callbacks me signIn function hai jo social login (GitHub/Google) ke liye hai:
  * jab user social login krta hai to NextAuth automatically user ka data deta hai
  * lekin wo data sirf NextAuth ke session me rehta hai
  * signIn callback me hum wo data apne database me bhi save kr lete hai
  * is tarah social login krne wale users ka data bhi humare database me rehta hai
  * jabki normal email/password login ke liye api/login/route.js use hota hai

3. providers array me 3 providers hai:

a) CredentialsProvider:
   - custom login form ke fields define krta hai (email, password)
   - authorize function me:
     * database se user ko find krta hai
     * user milne pr return krta hai, nahi milne pr null
   - credentials field me login form ke fields define kiye hai:
     * email: text type field
     * password: password type field
     * ye fields NextAuth ke default login form me show honge
   
   - authorize function credentials parameter se email/password leta hai:
     * ye async function hai kyuki database operations async hoti hai
     * credentials me wahi fields milte hai jo upar define kiye
     * database se user find karta hai email ke basis pr
     * agar user nahi milta ya password match nahi karta to null return
     * valid user milne pr user object return karta hai
     * return kiya hua data NextAuth ke session me available hoga

   - CredentialsProvider ka use karne ke benefits:
     * Custom login form bana sakte hai
     * Database se integration kar sakte hai
     * Password hashing/validation implement kar sakte hai
     * Error handling customize kar sakte hai
     * Session me custom user data store kar sakte hai

   - Security features:
     * Password database me hashed store hota hai
     * CSRF protection automatically milti hai
     * Rate limiting implement kar sakte hai
     * Invalid login attempts track kar sakte hai


b) GitHubProvider:
   - GitHub se login ke liye
   - environment variables se clientId aur clientSecret leta hai

c) GoogleProvider:
   - Google se login ke liye
   - environment variables se clientId aur clientSecret leta hai

Is setup se users 3 tarike se login kr sakte hai:
1. Email/password se
2. GitHub account se
3. Google account se

/*
1. pages: Custom login/auth pages ke URLs define krne ke liye (e.g. /login)
2. callbacks: Authentication process ke different stages me custom logic add karne ke liye hota hai:
   - signIn: Jab user login karta hai tab kya karna hai
   - session: Session data ko modify karne ke liye
   - jwt: JWT token ko modify karne ke liye
   - redirect: Login/logout ke baad kahan redirect karna hai
   
   Example: signIn callback me hum check kar sakte hain:
   - Kya user authorized hai?
   - User ka data database me save karna hai?
   - Koi extra validation lagani hai?
   
   Is tarah callbacks se hum authentication flow ko customize kar sakte hain.
3. providers: Different login methods setup krne ke liye (e.g. credentials, GitHub, Google etc.)
*/

// Jab bhi koi login krega, signIn callback chalega jo check krega ki user database me hai ya nahi,
// aur nahi hai to create kr dega. Ye important hai kyunki social login me hume user ka data
// apne database me bhi rakhna hota hai.
