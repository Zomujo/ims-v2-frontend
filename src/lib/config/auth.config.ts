/* eslint-disable no-param-reassign */

import { isTokenExpired } from "@/features/auth/auth.utils";
import { authRefreshTokenAction } from "@/features/shared/actions/auth.action";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { LoginCredentialsProvider } from "./auth.providers";

export const AUTH_OPTIONS_CONSTANTS = {
  EMAIL_PASSWORD: "email-password",
  CREATE_ACCOUNT: "create-account",
  LOG_OUT: "log-out",
};

export const authOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [LoginCredentialsProvider()],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token = { ...user };
      }

      if (trigger === "update" && session) {
        token.status = session.status || token.status;
      }

      if (!user && isTokenExpired(token.expiresAt)) {
        token = await refreshToken(token);
      }
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

async function refreshToken(tokenObj: JWT) {
  const refreshTokenResponse = await authRefreshTokenAction(
    tokenObj.tokens.refreshToken,
  );

  return refreshToken
    ? {
        ...tokenObj,
        expiresAt: refreshTokenResponse?.expiresAt ?? "",
        tokens: { ...tokenObj.tokens, ...refreshToken },
      }
    : ({} as JWT);
}
