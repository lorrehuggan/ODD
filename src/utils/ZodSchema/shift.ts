import { z } from "zod";

export const createShiftSchema = z.object({
  companyId: z.string(),
  start: z.date(),
  end: z.date(),
  earnings: z.number(),
  date: z.date(),
});

export const updateShiftSchema = z.object({
  id: z.string(),
  name: z.string(),
  start: z.date(),
  end: z.date(),
  earnings: z.number(),
  date: z.date(),
});
