// import "next-auth";
// import "next-auth/jwt";
import { AuthIMSLoginObj } from "./auth-action.types";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: AuthIMSLoginObj & { id: string; email: string };
  }

  interface User extends AuthIMSLoginObj {
    id: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends AuthIMSLoginObj {
    id: string;
    email: string;
  }
}
