interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="auth-layout grid grid-cols-2 min-h-screen">
      <div className="auth-layout__left bg-secondary"></div>
      <div className="auth-layout__right flex justify-center items-center">
        <div className="auth-form space-y-3">
          <div className="auth-form__title">
            <h1 className="font-bold text-4xl">{title}</h1>
          </div>
          <div className="auth-form__subtitle">
            <p className="font-semibold">{subtitle}</p>
          </div>
          <div className="auth-form__children">{children}</div>
        </div>
      </div>
    </div>
  );
}
