"use server";
import EditJobPostForm from "@/app/components/EditJobPostForm";
import { prisma } from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id: string) {
  const data = await prisma.job.findUnique({
    where: {
      id,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}
interface PageProps {
  params: Promise<{ id: string; jobId: string }>;
}
export default async function page({ params }: PageProps) {
  const { id } = await params;

  const data = await getData(id);
  return (
    <div>
      <div className="flex items-center m-4 ">
        <Button size="icon" variant="outline" asChild>
          <Link href={"/dashboard"}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="ms-2 font-semibold"> To Dashboard</h1>
      </div>
      <EditJobPostForm data={data} />
    </div>
  );
}
