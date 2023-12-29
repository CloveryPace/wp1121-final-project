import { z } from "zod";

export const updateFoodSchema = z.object({
  id: z.string().optional(),
  count: z.number().optional(),
});
