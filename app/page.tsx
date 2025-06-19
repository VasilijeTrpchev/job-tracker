import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2B7FFF]/90 to-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-center max-w-3xl text-gray-800 leading-snug mb-10">
        Welcome to Your Job Search Command Center!
        <span className="block font-normal text-lg mt-4 text-gray-600">
          Every application is a step forward — we’re here to help you keep it
          organized, stress-free, and under control.
        </span>
      </h1>
      <div className="w-full max-w-md mb-8">
        <Image
          className="rounded-xl shadow-lg"
          width={800}
          height={800}
          alt="logo"
          src="/logonew1.png"
          priority
        />
      </div>
      <div className="flex gap-2 mt-6">
        {session ? (
          <>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white transition"
              variant="secondary"
            >
              <LogoutLink>Log out</LogoutLink>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white transition">
              <Link href={"/dashboard"}>Go to Dashboard</Link>
            </Button>
          </>
        ) : (
          <div className="flex gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white transition">
              <LoginLink>Login</LoginLink>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white transition">
              <RegisterLink>Sign up</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
