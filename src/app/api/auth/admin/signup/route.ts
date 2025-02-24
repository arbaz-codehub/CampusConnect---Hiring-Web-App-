import { dbConnect } from "@/db/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User as MyUser } from "@/model/User";

// For Database Connection
dbConnect();

export async function POST(request: NextRequest) {
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync("123456", salt);
  await MyUser.create({
    email: "admin@gmail.com",
    password: password,
    name: "Admin",
    role: "Admin",
  });

  return NextResponse.json({
    status: 200,
    message: "Admin created successfully",
  });
}
