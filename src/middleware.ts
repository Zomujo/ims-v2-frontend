import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { UserStatus } from "@features/shared/types/auth-action.types";
import {
  getUserStatusFromToken,
  redirectPendingUsers,
  redirectUsersWithoutTokenBackToLogin,
} from "@/lib/utils/middleware.utils";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    if (!token) {
      return redirectUsersWithoutTokenBackToLogin(req.url);
    }
    if (getUserStatusFromToken(token) === UserStatus.PENDING) {
      return redirectPendingUsers(req.url);
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-current-path", req.nextUrl.pathname);

    return NextResponse.next({
      request: {
        ...req,
        headers: requestHeaders,
      },
    });
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
  matcher: [
    "/((?!auth|api|_next/static|_next/image|favicon.ico|manifest|public|icon|fonts|screenshots|sw.js).*)",
  ],
};
