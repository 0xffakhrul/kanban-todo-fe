import AuthLayout from "./AuthLayout";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <AuthLayout title="Welcome!" subtitle="Create an account">
      <RegisterForm />
    </AuthLayout>
  );
}
