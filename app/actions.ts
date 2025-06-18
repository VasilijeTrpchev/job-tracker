"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { JobPostSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";

export async function CreateJobAction(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const submission = parseWithZod(formData, {
    schema: JobPostSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const response = await prisma.job.create({
    data: {
      companyName: submission.value.companyName,
      jobTitle: submission.value.jobTitle,
      status: submission.value.status,
      appliedAt: submission.value.appliedAt,
      userId: user.id,
    },
  });

  return redirect("/dashboard");
}

export async function UpdateJobAction(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const submission = parseWithZod(formData, {
    schema: JobPostSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const response = await prisma.job.update({
    where: {
      id: formData.get("jobId") as string,
      userId: user.id,
    },
    data: {
      companyName: submission.value.companyName,
      jobTitle: submission.value.jobTitle,
      status: submission.value.status,
      appliedAt: submission.value.appliedAt,
    },
  });

  return redirect("/dashboard");
}

export async function RemoveJobAction(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const response = await prisma.job.delete({
    where: {
      id: formData.get("removePost") as string,
      userId: user.id,
    },
  });

  return redirect("/dashboard");
}
