import { Link } from "react-router-dom";
import "./style.css";

export default function HomePage() {
  return (
    <div className="home-container">
      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to <span>WalletPro</span></h1>
          <p className="hero-subtitle">
            Manage your cards, track transactions, and recharge your balance with ease.
          </p>
          <div className="hero-buttons">
            <Link to="/h/sign-up" className="btn btn-gradient">Get Started</Link>
            <Link to="/h/sign-in" className="btn btn-outline">Sign In</Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="features">
        <h2 className="section-title">Why Choose WalletPro?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="bi bi-credit-card-2-front feature-icon"></i>
            <h3>Smart Card Management</h3>
            <p>Organize and monitor all your cards in one secure place.</p>
          </div>
          <div className="feature-card">
            <i className="bi bi-bar-chart-line feature-icon"></i>
            <h3>Real-Time Tracking</h3>
            <p>Stay updated with instant transaction history and balance updates.</p>
          </div>
          <div className="feature-card">
            <i className="bi bi-shield-lock feature-icon"></i>
            <h3>Secure Payments</h3>
            <p>Enjoy encrypted and safe transactions with professional-grade security.</p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>© 2025 WalletPro. All rights reserved.</p>
      </footer>
    </div>
  );
}
