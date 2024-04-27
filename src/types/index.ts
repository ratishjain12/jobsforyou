import { Job } from "@prisma/client";

export interface JobList {
  job: Job;
}

export const jobTypes = ["Full-time", "Internship", "Part-time", "Contract"];

export const locationTypes = ["Remote", "Hybrid", "Onsite"];
