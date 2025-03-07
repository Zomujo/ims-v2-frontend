import "next-auth";
import { AuthIMSUser } from "./auth-action.types";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: { data: AuthIMSUser };
  }

  interface User extends AuthIMSUser {
    id: string;
  }
}
