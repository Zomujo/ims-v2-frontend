import { AuthFormHeading, AuthHeader } from "@/features/auth/auth-components";
import { LoginForm } from "@/features/auth/auth-login";

export default function Login() {
  return (
    <section className="flex flex-col items-center pt-6">
      <div className="flex w-[60%] flex-1 flex-col">
        <AuthHeader
          btnLabel="Super admin? Login"
          btnHrf="/auth/signup"
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
