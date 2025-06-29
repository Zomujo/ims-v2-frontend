import {
  AuthFormHeading,
  AuthHeader,
} from "@/features/auth/auth-components-server";
import { AUTH_PAGE_ROUTES } from "@/lib/constant";
import AuthTokenExpired from "@features/auth/auth-token-expired";

export default function TokenExpired() {
  return (
    <section className="flex flex-col items-center overflow-y-auto pt-6">
      <div className="flex w-[90%] flex-1 flex-col sm:w-[65%]">
        <AuthHeader
          btnLabel="Already have an account? Login"
          btnHrf={AUTH_PAGE_ROUTES.LOG_IN}
          className="flex"
        />
        <AuthFormHeading
          title="Token Expired"
          description="Your verification token has expired."
          className="mt-[12%]"
        />
        <AuthTokenExpired />
      </div>
    </section>
  );
}
