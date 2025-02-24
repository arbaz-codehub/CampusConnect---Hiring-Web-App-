import SignOutBtn from "@/components/SignOutBtn";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = (await getServerSession(authOptions)) as CustomSession;

  if (!session) {
    redirect("/login");
  }

  return (
    <section>
      <div className="auth-container bg-purple-300 ">
        <h1>Student Home Page</h1>
        <p>{JSON.stringify(session?.user)}</p>
        <SignOutBtn />
      </div>
    </section>
  );
}
