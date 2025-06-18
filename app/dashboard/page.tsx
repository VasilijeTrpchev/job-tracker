"use server";
import { Badge } from "@/components/ui/badge";
import CreateJobPostForm from "../components/CreateJobPostForm";
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import {
  BadgeCheckIcon,
  CircleDollarSign,
  CircleX,
  Ellipsis,
  Headset,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

async function getData(userId: string) {
  const data = await prisma.job.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("api/auth/login");
  }
  const data = await getData(user.id);
  return (
    <>
      <div className="grid lg:grid-cols-2 ">
        <CreateJobPostForm />
        <div className="grid lg:grid-rows-3  sm:grid-cols-2 p-6 gap-4 ">
          {data === undefined || data.length === 0 ? (
            <h2 className="grid text-center font-semibold">
              You dont have any jobs yet
            </h2>
          ) : (
            data.map((j) => {
              return (
                <Card key={j.id}>
                  <CardHeader>
                    <CardTitle>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-gray-500"> Job position:</p>
                          <h2 className="text-lg text-black">{j.jobTitle}</h2>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Ellipsis className="cursor-pointer" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Link href={`/dashboard/${j.id}`}>Edit card</Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardTitle>
                    <CardTitle className="pt-4">
                      <div className="flex-row items-center">
                        <p className="text-gray-500 font-semibold">
                          Company name:
                        </p>
                        <h2 className="text-lg text-black">{j.companyName}</h2>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className=" text-gray-700/70">
                      Applied on: {j.appliedAt}
                    </p>
                    <Badge
                      variant={
                        j.status === "denied" ? "destructive" : "outline"
                      }
                      className={`flex items-center  ${
                        j.status === "interview"
                          ? "text-orange-500 bg-amber-200/20 font-semibold  "
                          : j.status === "applied"
                          ? "bg-blue-600 text-white font-semibold"
                          : j.status === "hired"
                          ? "bg-green-600 text-white font-semibold"
                          : ""
                      }`}
                    >
                      Status:
                      <div>
                        {" "}
                        {j.status === "applied" && <BadgeCheckIcon size={24} />}
                        {j.status === "hired" && <CircleDollarSign size={24} />}
                        {j.status === "interview" && <Headset size={24} />}
                        {j.status === "denied" && <CircleX size={24} />}
                      </div>
                      {j.status}
                    </Badge>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="destructive" asChild>
                      <Link href={`/dashboard/${j.id}/jobid`}> Remove</Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default page;
