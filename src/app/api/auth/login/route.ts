import { dbConnect } from "@/db/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import bcrypt from "bcryptjs";
import { User as MyUser } from "@/model/User";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    // Request body ko json me convert karo
    const body = await request.json();
    // Validation ke rules set karo
    const validator = vine.compile(loginSchema);
    // Custom error reporter set karo
    validator.errorReporter = () => new ErrorReporter();
    // Input data ko validate karo
    const output = await validator.validate(body);

    // Email se student ko dhundho database me
    const user = await MyUser.findOne({ email: output.email });
    if (user) {
      // Password ko compare karo jo user ne diya hai aur jo database me hai
      const checkPassword = bcrypt.compareSync(
        output.password!, // ! is a non-null assertion operator in TypeScript. Yahan iska use isliye kiya hai kyunki TypeScript ko batana hai ki output.password definitely null ya undefined nahi hoga. Kyunki loginSchema me password required hai, to hum sure hain ki password field hamesha present hoga.
        user.password
      );
      // Agar password sahi hai to success response do
      if (checkPassword) {
        return NextResponse.json(
          {
            status: 200,
            message: "User Logged in",
          },
          { status: 200 }
        );
      }
      // Password galat hai to error response do
      return NextResponse.json(
        {
          status: 400,
          errors: {
            email: "Please check your credentials",
          },
        },
        { status: 200 }
      );
    }

    // Agar email se koi student nahi mila to error response do
    return NextResponse.json(
      {
        status: 400,
        errors: {
          email: "No user found with this email.",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // Agar validation error hai to usko handle karo
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
  }
}

/*
Ye code ek login API endpoint hai jo student ko login karne ka kaam karta hai. Chalo line by line samajhte hain:

1. Sabse pehle different packages import kiye gaye hain:
   - dbConnect: Database se connect karne ke liye
   - NextRequest/Response: API requests handle karne ke liye
   - loginSchema: Login form ka validation schema
   - vine: Form validation ke liye
   - ErrorReporter: Custom error reporting ke liye
   - bcrypt: Password hashing ke liye
   - Student: Database model

2. dbConnect() call karke database se connection establish kiya jata hai

3. POST function main logic handle karta hai:
   - request.json() se body data extract kiya jata hai
   - vine validator se login data validate kiya jata hai
   - Custom error reporter set kiya jata hai
   - validator.validate se data validate hota hai

4. Student.findOne se email ke basis par student search kiya jata hai:
   - Agar student milta hai to:
     * bcrypt.compareSync se password check hota hai
     * Agar password sahi hai to success response (200)
     * Agar password galat hai to credential error (400)
   - Agar student nahi milta to "No student found" error (400)

5. Try-catch block validation errors handle karta hai:
   - Agar validation fail hoti hai to proper error message return hota hai

Ye basically ek secure login system hai jo:
- Input validation
- Password hashing
- Database querying
- Error handling
ye sab handle karta hai
*/
