import NextAuth from "next-auth/next";

import { options } from "./options";

export const {
  handler: { GET, POST },
} = NextAuth(options);
