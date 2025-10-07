import "./AuthLayout.scss";

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
    <div className="auth-layout">
      <div className="auth-layout__left"></div>
      <div className="auth-layout__right">
        <div className="auth-form">
          <div className="auth-form__title">
            <h1>{title}</h1>
          </div>
          <div className="auth-form__subtitle">
            <p>{subtitle}</p>
          </div>
          <div className="auth-form__children">{children}</div>
        </div>
      </div>
    </div>
  );
}
