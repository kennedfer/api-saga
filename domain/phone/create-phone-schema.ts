import { z } from "zod";

export const createPhoneSchema = z.object({
  phone_number: z.string().min(11).max(20),
  phone_name: z.string().min(1),
  created_at: z
    .preprocess(
      (v) => (typeof v === "string" || v instanceof Date ? new Date(v) : v),
      z.date()
    )
    .optional(),
});
