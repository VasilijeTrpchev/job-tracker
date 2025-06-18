import { z } from "zod";
export const JobPostSchema = z.object({
  companyName: z.string().min(1).max(35),
  jobTitle: z.string().min(1).max(40),
  status: z.string().min(1).max(12),
  appliedAt: z.string().min(1),
});
