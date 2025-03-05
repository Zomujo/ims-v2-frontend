import { AuthHeader, LoginForm } from "@/features/auth/auth.component";

export default function Login() {
  return (
    <div className="flex flex-col items-center gap-4 pt-6">
      <AuthHeader
        btnLabel="Super admin? Login"
        btnHrf="/auth/signup"
        className="flex w-2/3"
      />
      <LoginForm />
    </div>
  );
}
