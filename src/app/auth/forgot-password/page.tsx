import { AuthFormHeading, AuthHeader } from "@/features/auth/auth-components";
import { GobackButton } from "@/features/auth/auth-components-client";
import { ForgotPasswordForm } from "@/features/auth/auth-forgot-password";

export default async function ForgotPassword() {
  return (
    <section className="flex flex-col items-center overflow-y-auto pt-6">
      <div className="flex w-[90%] flex-1 flex-col sm:w-[65%]">
        <AuthHeader className="flex">
          <GobackButton />
        </AuthHeader>
        <AuthFormHeading
          title="Forgot password"
          description="Enter your email and a verification code will be sent to your mail."
          className="mt-[20%]"
        />
        <ForgotPasswordForm />
      </div>
    </section>
  );
}
