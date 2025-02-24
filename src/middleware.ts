// Next.js ke authentication aur routing ke liye zaruri imports
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { CustomUser } from "./app/api/auth/[...nextauth]/options";
import { dbConnect } from "./db/mongo.config";

// Middleware function jo har request ke time pe check kregi ki user authenticated hai ya nahi
export async function middleware(request: NextRequest) {
  // Current URL ka pathname nikalna, jisse pata chalega user kis route pe hai
  const { pathname } = request.nextUrl;

  // Static files ya API requests middleware se bypass ho jayein
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  console.log("Middleware Running on Route:", pathname); // Debugging log

  // Missing fields ke liye route define kiya hai
  const missingFieldsRoute = "/missing-field";

  // Ye check krta hai ki user public routes pe hai ya nahi (jaise login pages aur missing fields page)
  // Matlab agar user in pages pe visit kr raha hai, toh usko directly aage jaane denge
  // Koi login ya authentication check nahi karenge kyunki ye public pages hain
  if (
    pathname == "/login" ||
    pathname == "/admin/login" ||
    pathname == missingFieldsRoute
  ) {
    return NextResponse.next();
  }

  // JWT token ko fetch krta hai request se, jo batayega ki user logged in hai ya nahi
  const token = await getToken({ req: request });

  // Normal users ke liye protected routes ki list - abhi sirf homepage
  const userProtectedRoutes = ["/company", "/student"];

  // Admin users ke liye protected routes ki list - admin dashboard
  const adminProtectedRoutes = ["/admin/dashboard"];

  // Agar token nahi hai (user logged in nahi hai) aur wo protected route access kr raha hai
  // Toh use login page pe redirect kr dega with error message
  if (
    token == null &&
    (userProtectedRoutes.includes(pathname) ||
      adminProtectedRoutes.includes(pathname))
  ) {
    return NextResponse.redirect(
      new URL(
        "/login?error=Please login first to access this route",
        request.url
      )
    );
  }

  // **Fixing Infinite Redirect Loop**
  if (token && (!token.userRole || token.userRole === "")) {
    // Get timestamp from cookies
    const lastRedirect = request.cookies.get("lastRedirect")?.value;
    const now = Date.now();

    if (!lastRedirect || now - Number(lastRedirect) > 30000) {
      // 30 second ho gaye, toh redirect allow karo
      const response = NextResponse.redirect(
        new URL("/missing-field", request.url)
      );
      response.cookies.set("lastRedirect", now.toString(), {
        maxAge: 30, // 30 seconds timeout
        httpOnly: true,
      });
      return response;
    } else {
      // 30 second ke andar dubara redirect nahi karenge
      return NextResponse.next();
    }
  }

  // Token se user ki details nikalna
  const user: CustomUser | null = token?.user as CustomUser;

  // Agar user login page pe tha aur abhi login ho gaya hai
  if (token && pathname === "/") {
    let redirectUrl = "";

    // Role-based redirection
    if (token.userRole === "Student") {
      redirectUrl = "/student";
    } else if (token.userRole === "Company") {
      redirectUrl = "/company";
    }

    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // 🛑 **Role-based Route Restrictions** 🛑
  if (token?.userRole === "Company" && pathname.startsWith("/student")) {
    return NextResponse.redirect(
      new URL("/company?error=Unauthorized", request.url)
    );
  }

  if (token?.userRole === "Student" && pathname.startsWith("/company")) {
    return NextResponse.redirect(
      new URL("/student?error=Unauthorized", request.url)
    );
  }

  // Agar normal user admin routes access krne ki koshish kr raha hai
  // Toh use admin login page pe redirect kr dega
  if (adminProtectedRoutes.includes(pathname) && user?.role === "User") {
    return NextResponse.redirect(
      new URL("/admin/login?error=Unauthorized", request.url)
    );
  }

  // Agar admin user normal user routes access krne ki koshish kr raha hai
  // Toh use normal login page pe redirect kr dega
  if (userProtectedRoutes.includes(pathname) && user?.role === "Admin") {
    return NextResponse.redirect(
      new URL(
        "/login?error=Please login first to access this route.",
        request.url
      )
    );
  }

  console.log("Middleware Executed");
  console.log("Token:", token);
  console.log("User Role:", token?.userRole);
  console.log("Current Route:", pathname);

  // Agar sab kuch theek hai toh request ko aage proceed hone dega
  return NextResponse.next();
}
