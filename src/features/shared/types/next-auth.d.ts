// import "next-auth";
// import "next-auth/jwt";
import { AuthIMSUser } from "./auth-action.types";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: AuthIMSUser & { id: string; email: string };
  }

  interface User extends AuthIMSUser {
    id: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends AuthIMSUser {
    id: string;
    email: string;
  }
}
