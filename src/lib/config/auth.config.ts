/* eslint-disable no-param-reassign */

import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession, NextAuthOptions } from "next-auth";
import { LoginCredentialsProvider } from "./auth.providers";

export const AUTH_OPTIONS_CONSTANTS = {
  LOGIN: "login",
  CREATE_ACCOUNT: "create-account",
  LOG_OUT: "log-out",
};

export const authOptions = {
  pages: { signIn: "/auth/login" },
  session: {
    strategy: "jwt",
    // Effectively "forever" (10 years)
    maxAge: 10 * 365 * 24 * 60 * 60,
  },
  providers: [LoginCredentialsProvider()],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token = { ...user };
      }
      // Still allow manual status update if you use trigger: 'update'
      if (trigger === "update" && session) {
        token.status = session.status || token.status;
      }
      // No refresh / expiry logic.
      return token;
    },
    async session({ session, token }) {
      if (token.tokens) {
        session.user = { ...session.user, ...token };
      }
      return session;
    },
  },
  logger: {
    error: console.error,
  },
} satisfies NextAuthOptions;

export function imsServerSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
