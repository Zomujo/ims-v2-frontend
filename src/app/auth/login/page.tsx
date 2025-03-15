import { AuthFormHeading, AuthHeader } from "@/features/auth/auth-components";
import { LoginForm } from "@/features/auth/auth-login";
import { AUTH_PAGE_ROUTES } from "@/lib/constant";

export default function Login() {
  return (
    <section className="flex flex-col items-center pt-6">
      <div className="flex w-[90%] flex-1 flex-col sm:w-[65%]">
        <AuthHeader
          btnLabel="Super admin? Login"
          btnHrf={AUTH_PAGE_ROUTES.CREATE_ACCOUNT}
          className="flex"
        />
        <AuthFormHeading
          title="Welcome back!"
          description="Provide this information from your healthcare facility to get started."
        />
        <LoginForm />
      </div>
    </section>
  );
}
