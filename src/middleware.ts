import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { UserStatus } from "@features/shared/types/auth-action.types";
import {
  redirectUsersWithoutTokenBackToLogin,
  getUserStatusFromToken,
  redirectPendingUsers,
} from "@/lib/utils/middleware.utils";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    if (!token) {
      return redirectUsersWithoutTokenBackToLogin(req.url);
    }
    if (getUserStatusFromToken(token) === UserStatus.PENDING) {
      return redirectPendingUsers(req.url);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ["/((?!auth|api|_next/static|_next/image|favicon.ico).*)"],
};
