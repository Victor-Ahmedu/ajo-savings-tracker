import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <h1 className="hero-title">Track Your Ajo, Transparently</h1>
      <p className="hero-subtitle">
        No more notebooks, no more confusion. Keep every group's contributions
        organized and visible to everyone involved.
      </p>
      <div className="hero-actions">
        <Link to="/create-group" className="hero-btn hero-btn-primary">
          Create a Group
        </Link>
        <Link to="/dashboard" className="hero-btn hero-btn-secondary">
          View Dashboard
        </Link>
      </div>
    </section>
  );
}

export default Hero;
