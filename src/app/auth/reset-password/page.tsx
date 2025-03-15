import { AuthFormHeading, AuthHeader } from "@/features/auth/auth-components";
import { ResetPasswordForm } from "@/features/auth/auth-reset-password";

export default async function ResetPassword() {
  return (
    <section className="flex flex-col items-center overflow-y-auto pt-6">
      <div className="flex w-[90%] flex-1 flex-col sm:w-[65%]">
        <AuthHeader className="flex" />
        <AuthFormHeading
          title="Reset your password"
          description="Create a new password and confirm your password."
          className="mt-[20%]"
        />
        <ResetPasswordForm />
      </div>
    </section>
  );
}
