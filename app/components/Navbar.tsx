import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOut, SquareMenu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between text-center items-center py-4 px-1 bg-[#2B7FFF]/90 lg:m-8 m-4 rounded-2xl lg:rounded-4xl">
        <Link href={"/dashboard"}>
          <Image
            className="h-[40px] w-[40px] rounded-2xl md:ml-4 "
            width={50}
            height={50}
            alt="logo"
            src="/logonew1.png"
          />
        </Link>
        <h1 className="font-bold text-[10px] md:text-2xl">
          Manage your all job posts at one place !
        </h1>

        <Button className="md:mr-4 hidden md:flex" asChild variant="secondary">
          <LogoutLink>
            <LogOut /> Log out
          </LogoutLink>
        </Button>
        <div className="md:hidden mr-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <SquareMenu />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <LogoutLink>
                  <LogOut /> Log out
                </LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
