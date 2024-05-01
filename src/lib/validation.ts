import { jobTypes, locationTypes } from "@/types";
import { z } from "zod";

const requiredString = z.string().min(1, "required");

const numericString = requiredString.regex(/^[0-9]/, "must be a number");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine((file) => {
    return !file || (file instanceof File && file.type.startsWith("image/"));
  }, "Must be an Image")
  .refine(
    (file) => !file || file.size < 1024 * 1024 * 2,
    "File must be less than 2 mb",
  );

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (location) => locationTypes.includes(location),
      "Invalid location type",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    },
  );

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid Job Type",
    ),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericString.max(9, "Number cant be longer than 9 jobs"),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type createJobType = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  Remote: z.coerce.boolean().optional(),
  Hybrid: z.coerce.boolean().optional(),
  Onsite: z.coerce.boolean().optional(),
});

export type jobFilterValues = z.infer<typeof jobFilterSchema>;
