import { RemoveJobAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

interface PageProps {
  params: Promise<{ id: string; jobId: string }>;
}

export default async function page({ params }: PageProps) {
  const { jobId } = await params;

  return (
    <div className="flex items-center justify-center  px-4 mt-20">
      <Card className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 ">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-red-600">
            Are you sure?
          </CardTitle>
          <CardDescription className="text-base sm:text-lg text-gray-600">
            This action cannot be undone. It will permanently delete your job
            post.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary">
            <Link href={`/dashboard`}>Cancel</Link>
          </Button>
          <form action={RemoveJobAction}>
            <input type="hidden" name="removePost" value={jobId} />
            <Button
              className="cursor-pointer"
              type="submit"
              variant="destructive"
            >
              I am sure !
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
