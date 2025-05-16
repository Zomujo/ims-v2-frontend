import CredentialsProvider from "next-auth/providers/credentials";
import { AUTH_OPTIONS_CONSTANTS } from "./auth.config";
import {
  authCreateAccountAction,
  authLoginAction,
} from "@/features/shared/actions/auth.action";

export const LoginCredentialsProvider = () =>
  CredentialsProvider({
    name: "Credentials",
    id: AUTH_OPTIONS_CONSTANTS.EMAIL_PASSWORD,
    credentials: {
      email: {
        type: "email",
      },
      password: {
        type: "password",
      },
    },
    async authorize(credentials) {
      if (!credentials) return null;
      return await authLoginAction({
        email: credentials.email,
        password: credentials.password,
      });
    },
  });

export const CreateAccountCredentialsProvider = () =>
  CredentialsProvider({
    name: "Credentials",
    id: AUTH_OPTIONS_CONSTANTS.CREATE_ACCOUNT,
    credentials: {
      email: {
        type: "email",
      },
      password: {
        type: "password",
      },
      fullName: {
        type: "text",
      },
      facilityName: {
        type: "text",
      },
      facilityPassword: {
        type: "text",
      },
    },
    async authorize(credentials) {
      if (!credentials) return null;
      return await authCreateAccountAction(credentials);
    },
  });
