import AuthLayout from "./AuthLayout";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Please enter your details to sign in"
    >
      <LoginForm />
    </AuthLayout>
  );
}
