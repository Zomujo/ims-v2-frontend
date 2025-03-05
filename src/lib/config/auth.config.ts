// import {
//     signInAction
// } from "@/server-actions/auth-actions";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { NextAuthOptions, getServerSession } from "next-auth";

export const authOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   id: "email-password",
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "email",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials) return null;
    //     return {} as { email: string; password: string};
    //   },
    // }),
  ],
  //   callbacks: {
  //     async jwt({ token, user }) {
  //       if (user) {
  //         token = user as unknown as Omit<SignInObject, "id">;
  //       }

  //       if (!user && isTokenExpired(token.expireTime)) {
  //         const newToken = await refreshTheToken(token.refreshToken);
  //         token = { ...token, ...(newToken ?? {}) };
  //       }
  //       return token;
  //     },
  //     async signIn({ account, user }) {
  //       if (account?.provider === "google") {
  //         try {
  //           const res = await signInWithGoogleAction({
  //             email: user.email ?? "",
  //             googleId: user.id,
  //           });
  //           if (!res) return false;
  //           user.token = res?.token ?? "";
  //           user.user = { ...user.user, ...res?.user };
  //         } catch (error) {
  //           console.log("error", error);
  //           return false;
  //         }
  //       }
  //       return true;
  //     },
  //     async session({ session, token }) {
  //       if (token) {
  //         session.user = { ...session.user, ...token.user };
  //         session.token = token.token;
  //         session.refreshToken = token.refreshToken;
  //       }
  //       return session;
  //     },
  //   },
} satisfies NextAuthOptions;

export function imsServerSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
