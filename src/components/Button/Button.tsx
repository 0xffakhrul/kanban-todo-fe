import "./Button.scss";

type ButtonVariant = "primary" | "secondary" | "danger" | "warning";

interface Button {
  text: string;
  variant?: ButtonVariant;
}

export default function Button({ text, variant }: Button) {
  return <button className={`btn btn--${variant}`}>{text}</button>;
}
