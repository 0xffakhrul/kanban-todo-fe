import "./Button.scss";

type ButtonVariant = "primary" | "secondary" | "danger" | "warning";

interface Button {
  text: string;
  variant?: ButtonVariant;
  onClick?: () => void;
}

export default function Button({ text, variant, onClick }: Button) {
  return (
    <button className={`btn btn--${variant}`} onClick={onClick}>
      {text}
    </button>
  );
}
