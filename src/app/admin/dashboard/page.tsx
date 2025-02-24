import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import SignOutBtn from "@/components/SignOutBtn";
import Toast from "@/components/Toast";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminDashBoard() {
  const session: CustomSession | null = await getServerSession(authOptions);

  /// Bad Idea bcoz har admin page pr ye condition lgani pdegiii
  // if (session == null || session?.user?.role != "Admin") {
  //   return redirect("/admin/login?error=please login first");
  // }

  return (
    <div className="flex justofy-center items-center px-10 pt-10 flex-col w-screen">
      <h1>Hiii Adminn jiii</h1>
      <h1 className="font-bold text-sm">
        {session && JSON.stringify(session)}
      </h1>
      <SignOutBtn type="Admin" />
    </div>
  );
}
