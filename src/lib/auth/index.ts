import NextAuth from "next-auth";

// const handler = NextAuth(options);
// export { handler as GET, handler as POST };
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import CredentialProvider from "@/lib/auth/CredentialProvider";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [CredentialProvider],
  callbacks: {
    // session內容在nextauth.d.ts定義
    // 從session取得user資料以供前端使用
    async session({ session, token }) {
      const username = token.username || session?.user?.username;
      if (!username) return session;
      const [user] = await db
        .select({
          id: usersTable.displayId,
          username: usersTable.username,
          // provider: usersTable.provider,
          // username: usersTable.username,
        })
        .from(usersTable)
        .where(eq(usersTable.username, username.toLowerCase()))
        .execute();
      return {
        ...session,
        user: {
          id: user.id,
          username: user.username,
          // email: user.email,
          // provider: user.provider,
        },
      };
    },
  },
  // session: {
  //   strategy: "jwt",
  // },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/",
  },
});
