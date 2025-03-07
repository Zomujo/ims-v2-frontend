/* eslint-disable no-param-reassign */

import { authLoginAction } from "@/features/shared/actions/auth.action";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ENV_VARIABLES } from "./env.config";

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
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = { ...session.user, ...token };
      }
      console.log("session>>>", session);
      return session;
    },
  },
  logger: {
    error: console.error,
    debug(code, metadata) {
      console.log(code, metadata);
    },
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
