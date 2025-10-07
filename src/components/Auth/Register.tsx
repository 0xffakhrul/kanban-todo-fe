import AuthLayout from "./AuthLayout";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <AuthLayout title="register form" subtitle="register">
      <RegisterForm />
    </AuthLayout>
  );
}
