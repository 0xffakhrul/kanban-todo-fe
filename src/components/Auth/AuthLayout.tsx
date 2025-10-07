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
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div>{children}</div>
    </div>
  );
}
