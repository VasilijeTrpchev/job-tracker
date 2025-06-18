"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState, useState } from "react";
import { JobPostSchema } from "../utils/zodSchemas";
import { UpdateJobAction } from "../actions";

interface Props {
  data: {
    companyName: string;
    jobTitle: string;
    status: string;
    appliedAt: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
  };
}
const EditJobPostForm = ({ data }: Props) => {
  const [date, setDate] = useState<Date | undefined>(new Date(data.appliedAt));
  const [status, setStatus] = useState<undefined | string>(data.status);
  const [appliedOn, setAppliedOn] = useState<undefined | string>(
    data.appliedAt
  );
  const [companyName, setCompanyName] = useState<undefined | string>(
    data.companyName
  );
  const [jobTitle, setJobTitle] = useState<undefined | string>(data.jobTitle);

  const [lastResult, action] = useActionState(UpdateJobAction, undefined);
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
  return (
    <div className="flex justify-center">
      <Card className="w-lvh">
        <CardHeader>
          <CardTitle>Add new Job</CardTitle>
          <CardDescription>
            Add new job application and keep track
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
          <input type="hidden" name="jobId" id="jobId" value={data.id} />
          <CardContent>
            <div className="flex flex-col gap-y-6">
              <div className="grid gap-2">
                <Label>Company name</Label>
                <Input
                  name={fields.companyName.name}
                  key={fields.companyName.key}
                  defaultValue={fields.companyName.initialValue}
                  placeholder="company name"
                  onChange={(e) => setCompanyName(e.target.value)}
                  value={companyName}
                />
                <p className="text-red-500 text-sm">
                  {fields.companyName.errors}
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Job title</Label>
                <Input
                  name={fields.jobTitle.name}
                  key={fields.jobTitle.key}
                  defaultValue={fields.jobTitle.initialValue}
                  placeholder="Job title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
                <p className="text-red-500 text-sm">{fields.jobTitle.errors}</p>
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
                  onChange={(e) => setStatus(e.currentTarget.value)}
                  readOnly
                  hidden
                />
                <p className="text-red-500 text-sm">{fields.status.errors}</p>
              </div>
              <div className="grid gap-2">
                <Label>Aplied on</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-lg border w-fit mx-auto"
                />
                <input
                  name={fields.appliedAt.name}
                  value={appliedOn}
                  onChange={(e) => setAppliedOn(e.currentTarget.value)}
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
              variant="ghost"
              className="bg-green-600 text-white cursor-pointer"
            >
              Update
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EditJobPostForm;
