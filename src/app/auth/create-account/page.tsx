import {
  AuthFormHeading,
  AuthHeader,
} from "@/features/auth/auth-components-server";
import { CreateAccountForm } from "@/features/auth/auth-create-account";
import { AUTH_PAGE_ROUTES } from "@/lib/constant";

export default function CreateAccount() {
  return (
    <section className="flex flex-col items-center overflow-y-auto pt-6">
      <div className="flex w-[90%] flex-1 flex-col sm:w-[65%]">
        <AuthHeader
          btnLabel="Already have an account? Login"
          btnHrf={AUTH_PAGE_ROUTES.LOG_IN}
          className="flex"
        />
        <AuthFormHeading
          title="Get started"
          description="Complete your details to get started."
          className="mt-[12%]"
        />
        <CreateAccountForm />
      </div>
    </section>
  );
}
