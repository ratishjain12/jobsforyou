import { z } from "zod";

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  Remote: z.coerce.boolean().optional(),
  Hybrid: z.coerce.boolean().optional(),
  Onsite: z.coerce.boolean().optional(),
});

export type jobFilterValues = z.infer<typeof jobFilterSchema>;
