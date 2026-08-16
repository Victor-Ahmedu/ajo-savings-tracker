import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" onClick={closeMenu}>
        Ajo Savings Tracker
      </Link>

      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`navbar-links ${menuOpen ? "navbar-links-open" : ""}`}>
        <Link to="/" className="navbar-link" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/dashboard" className="navbar-link" onClick={closeMenu}>
          Dashboard
        </Link>
        <Link to="/create-group" className="navbar-link" onClick={closeMenu}>
          Create Group
        </Link>
        <Link to="/about" className="navbar-link" onClick={closeMenu}>
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
