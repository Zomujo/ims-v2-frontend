/* eslint-disable no-param-reassign */

import {
  authLoginAction,
  authRefreshTokenAction,
} from "@/features/shared/actions/auth.action";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ENV_VARIABLES } from "./env.config";
import { isTokenExpired } from "@/features/auth/auth.utils";
import { JWT } from "next-auth/jwt";

export const AUTH_OPTIONS_CONSTANTS = {
  EMAIL_PASSWORD: "email-password",
};

export const authOptions = {
  pages: {
    signIn: "/auth/login",
  },
  secret: ENV_VARIABLES.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "email-password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password) return null;
        return await authLoginAction({
          email: credentials.email,
          password: credentials.password,
        });
      },
    }),
  ],
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
    : tokenObj;

  return newToken;
};
