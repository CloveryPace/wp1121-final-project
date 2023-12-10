import { z } from "zod";

export const authSchema = z.object({
  username: z.string(),
  // email: z.string().email(),
  // Passwords must be at least 8 characters long.
  // password: z.string().min(8),
  password: z.string(),
});
