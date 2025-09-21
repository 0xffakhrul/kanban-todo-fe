import "./Navbar.scss";

export default function Navbar() {
  return (
    <nav className="navbar">
      <p className="navbar__title">Kanban!</p>
      <div className="navbar__menu">
        <p className="navbar__item">Item 1</p>
        <p className="navbar__item">Item 1</p>
        <p className="navbar__item">Item 1</p>
        <p className="navbar__item">Item 1</p>
      </div>
    </nav>
  );
}
