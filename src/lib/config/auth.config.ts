/* eslint-disable no-param-reassign */

import { isTokenExpired } from "@/features/auth/auth.utils";
import { authRefreshTokenAction } from "@/features/shared/actions/auth.action";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { NextAuthOptions, getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import {
  CreateAccountCredentialsProvider,
  LoginCredentialsProvider,
} from "./auth.providers";

export const AUTH_OPTIONS_CONSTANTS = {
  EMAIL_PASSWORD: "email-password",
  CREATE_ACCOUNT: "create-account",
  LOG_OUT: "log-out",
};

export const authOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [LoginCredentialsProvider(), CreateAccountCredentialsProvider()],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...user };
      }

      if (!user && isTokenExpired(token.expiresAt)) {
        token = await refresToken(token);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
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

const refresToken = async (tokenObj: JWT) => {
  const refreshToken = await authRefreshTokenAction(
    tokenObj.tokens.refreshToken,
  );

  const newToken = refreshToken
    ? { ...tokenObj, tokens: { ...tokenObj.tokens, ...refreshToken } }
    : ({} as JWT);

  return newToken;
};
