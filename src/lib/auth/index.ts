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
      console.log("session", session);
      console.log("token", token);
      // 這邊的token還是default的內容，不知道有沒有辦法extend
      const name = token.name || session?.user?.username;
      if (!name) {
        return session;
      }
      const [user] = await db
        .select({
          id: usersTable.displayId,
          username: usersTable.username,
          // provider: usersTable.provider,
          // username: usersTable.username,
        })
        .from(usersTable)
        .where(eq(usersTable.username, name.toLowerCase()))
        .execute();
      console.log("user", user);
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
    async jwt({ token, account }) {
      // Sign in with social account, e.g. GitHub, Google, etc.
      if (!account) return token;
      const { name } = token;
      if (!name) return token;

      // Check if the email has been registered
      const [existedUser] = await db
        .select({
          id: usersTable.displayId,
        })
        .from(usersTable)
        .where(eq(usersTable.username, name.toLowerCase()))
        .execute();
      if (existedUser) return token;

      // // Sign up
      // await db.insert(usersTable).values({
      //   username: name,
      // });

      return token;
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
