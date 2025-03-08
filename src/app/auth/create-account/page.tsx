import { AuthFormHeading, AuthHeader } from "@/features/auth/auth-components";
import { AUTH_ROUTES } from "@/lib/constant";

export default function CreateAccount() {
  return (
    <section className="flex flex-col items-center pt-6">
      <div className="flex w-[90%] flex-1 flex-col sm:w-[65%]">
        <AuthHeader
          btnLabel="Already have an account? Login"
          btnHrf={AUTH_ROUTES.LOG_IN}
          className="flex"
        />
        <AuthFormHeading
          title="Get started"
          description="Complete your details to get started."
        />
        {/* <CreateAccountForm /> */}
      </div>
    </section>
  );
}
