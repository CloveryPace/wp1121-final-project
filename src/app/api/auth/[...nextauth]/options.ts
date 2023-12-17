import type { NextAuthOptions } from "next-auth";

import CredentialProvider from "@/lib/auth/CredentialProvider";

export const options: NextAuthOptions = {
  providers: [CredentialProvider],
  callbacks: {},
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
