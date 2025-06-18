"use client";
import React, { useActionState, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { CreateJobAction } from "../actions";
import { JobPostSchema } from "../utils/zodSchemas";
import { Button } from "@/components/ui/button";
const CreateJobPostForm = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [status, setStatus] = useState("");

  const [lastResult, action] = useActionState(CreateJobAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: JobPostSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const transformDate = (date: Date | undefined) => {
    const transformedDate = date?.toISOString().split("T")[0];
    return transformedDate;
  };
  return (
    <>
      <div className="lg:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Add new Job</CardTitle>
            <CardDescription>
              Add new job application and keep track
            </CardDescription>
          </CardHeader>
          <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <CardContent>
              <div className="flex flex-col gap-y-6">
                <div className="grid gap-2">
                  <Label>Company name</Label>
                  <Input
                    name={fields.companyName.name}
                    key={fields.companyName.key}
                    defaultValue={fields.companyName.initialValue}
                    placeholder="company name"
                  />
                  <p className="text-red-500 text-sm">
                    {fields.companyName.errors}
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label>Job position:</Label>
                  <Input
                    name={fields.jobTitle.name}
                    key={fields.jobTitle.key}
                    defaultValue={fields.jobTitle.initialValue}
                    placeholder="Job position"
                  />
                  <p className="text-red-500 text-sm">
                    {fields.jobTitle.errors}
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select
                    value={status}
                    onValueChange={(value) => setStatus(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select application status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="applied">Applied</SelectItem>
                      <SelectItem value="denied">Denied</SelectItem>
                      <SelectItem value="hired">Hired</SelectItem>
                      <SelectItem value="interview">
                        Interview Incoming
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <input
                    name={fields.status.name}
                    value={status}
                    readOnly
                    hidden
                  />
                  <p className="text-red-500 text-sm">{fields.status.errors}</p>
                </div>
                <div className="grid gap-2">
                  <Label>Applied on</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-lg border w-fit mx-auto"
                  />
                  <input
                    name={fields.appliedAt.name}
                    value={transformDate(date) ?? ""}
                    readOnly
                    hidden
                  />
                  <p className="text-red-500 text-sm">
                    {fields.appliedAt.errors}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                variant="ghost"
                className="bg-green-600 text-white cursor-pointer"
              >
                Add new Job
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateJobPostForm;
