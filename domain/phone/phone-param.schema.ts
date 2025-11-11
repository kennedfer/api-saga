import { z } from "zod";

export const phoneParamScheme = z.object({
  phone_id: z.string().nonempty().nonoptional(),
});
