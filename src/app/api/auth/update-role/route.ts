import { dbConnect } from "@/db/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import { User as MyUser } from "@/model/User";
import { getToken } from "next-auth/jwt";
import { CustomUser } from "../[...nextauth]/options";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/options";

// Connect to database
dbConnect();

export async function POST(request: NextRequest) {
  try {
    const { userRole, email } = await request.json();

    // Validate inputs
    if (!userRole || !email) {
      return NextResponse.json(
        { message: "User role and email are required" },
        { status: 400 }
      );
    }

    // Validate userRole is either Student or Company
    if (!["Student", "Company"].includes(userRole)) {
      return NextResponse.json(
        { message: "Invalid user role. Must be Student or Company" },
        { status: 400 }
      );
    }

    // Find and update user
    const user = await MyUser.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update user role in database
    user.userRole = userRole;
    await user.save();

    // Get current token and update userRole inside it
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token) {
      token.userRole = userRole;
    }

    return NextResponse.json({
      message: "User role updated successfully but session not found",
      userRole,
      status: 200,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { message: "Failed to update user role" },
      { status: 500 }
    );
  }
}
