import { z } from "zod";

export const createCompanySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Company name must be at least 2 characters",
    })
    .max(25, {
      message: "Company name must be at most 25 characters",
    }),
  role: z
    .string()
    .min(2, {
      message: "Company name must be at least 2 characters",
    })
    .max(25, {
      message: "Company name must be at most 25 characters",
    }),
});
