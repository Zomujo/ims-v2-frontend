import CredentialsProvider from "next-auth/providers/credentials";
import { AUTH_OPTIONS_CONSTANTS } from "./auth.config";
import { authLoginAction } from "@/features/shared/actions/auth.action";

export const LoginCredentialsProvider = () =>
  CredentialsProvider({
    name: "Credentials",
    id: AUTH_OPTIONS_CONSTANTS.LOGIN,
    credentials: {
      accountIdentifier: {
        type: "string",
      },
      password: {
        type: "password",
      },
    },
    async authorize(credentials) {
      if (!credentials) return null;
      return await authLoginAction(credentials);
    },
  });
