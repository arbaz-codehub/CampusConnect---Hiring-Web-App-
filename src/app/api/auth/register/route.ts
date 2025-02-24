import { dbConnect } from "@/db/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import bcrypt from "bcryptjs";
import { User as MyUser } from "@/model/User";

interface UserPayload {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  userRole: string;
}

// For Database Connection
dbConnect();

export async function POST(request: NextRequest) {
  try {
    // Request body ko json me convert karo
    const body: UserPayload = await request.json();

    // Validation ke rules set karo
    const validator = vine.compile(registerSchema);
    // Custom error reporter set kiya hai taki validation errors ko apne format me handle kar sake
    // By default vine apne format me errors deta hai, lekin ErrorReporter class ke through
    // hum errors ko customize kar sakte hain - jaise error messages ko user friendly banana
    validator.errorReporter = () => new ErrorReporter();

    // Input data ko validate karo
    const output = await validator.validate(body);

    // Check karo ki student ka email pehle se exist to nahi karta
    const user = await MyUser.findOne({ email: output.email });
    if (user) {
      return NextResponse.json(
        {
          status: 400,
          errors: {
            email: "This Email is already taken! Use another email",
          },
        },
        { status: 200 }
      );
    } else {
      // Password ko encrypt karo
      const salt = bcrypt.genSaltSync(10);
      output.password = bcrypt.hashSync(output.password, salt);

      // Naya student create karo database me with userRole
      await MyUser.create({
        ...output,
        userRole: body.userRole, // userRole field ko directly pass kiya
      });

      return NextResponse.json(
        {
          status: 200,
          message: "User Created Successfully",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    // Agar validation error hai to usko handle karo
    // Agar error VineJS ka validation error hai to
    if (error instanceof errors.E_VALIDATION_ERROR) {
      // Error response return karo
      // status: 400 batata hai ki request invalid thi
      // errors: error.messages me validation errors ka object hai
      // jisme field names keys honge aur error messages values
      // Example: { email: "Invalid email format", password: "Too short" }
      return NextResponse.json(
        { status: 400, errors: error.messages },
        // HTTP status 200 isliye hai kyuki ye expected behavior hai
        // 400 sirf client ko batane ke liye hai ki validation fail hui
        { status: 200 }
      );
    }
  }
}

/*
User registration ke baad session mein userRole add hone ka flow:

1. /api/auth/register endpoint pe user create hota hai with userRole

2. Frontend se registration ke baad /api/auth/login endpoint pe credentials based signin call hota hai
   (Using NextAuth signIn() function)

3. NextAuth.js ka configuration file (usually /api/auth/[...nextauth]/route.ts) mein:
   - authorize callback mein user ka data fetch hota hai
   - Session callback mein userRole add kiya jata hai session object mein
   
4. Is tarah session object mein userRole available ho jata hai application mein use karne ke liye

Example NextAuth config:


/*
Ye code ek student registration API endpoint hai jo Next.js ke route handler ke through implement kiya gaya hai.

Pura Code Overview:
- Ye API student ka registration handle karta hai
- Input validation karta hai
- Check karta hai ki email already exist toh nahi kar raha
- Password ko encrypt karke database mein store karta hai
- Appropriate response return karta hai

Line by Line Description:

1. Imports:
- dbConnect: MongoDB se connection establish karne ke liye
- NextRequest/Response: Next.js ke API routes ke liye
- registerSchema: Registration ke fields ki validation ke liye
- vine: Validation library
- ErrorReporter: Custom error reporting ke liye
- bcrypt: Password encryption ke liye
- Student: MongoDB ka model

2. dbConnect():
- Database se connection establish karta hai

3. POST function:
- request.json(): Request body ko parse karta hai
- vine.compile(registerSchema): Validation rules compile karta hai
- validator.validate(body): Input data ko validate karta hai

4. Email Check:
- Student.findOne(): Database mein check karta hai ki email exist karta hai ya nahi
- Agar email exist karta hai toh error response return karta hai

5. Password Encryption & Save:
- bcrypt.genSaltSync(): Password encryption ke liye salt generate karta hai
- bcrypt.hashSync(): Password ko encrypt karta hai
- Student.create(): New student ko database mein save karta hai
- Success response return karta hai

6. Error Handling:
- Validation errors ko handle karta hai
- Appropriate error messages return karta hai

Security Features:
- Input validation
- Password encryption
- Duplicate email check
*/
