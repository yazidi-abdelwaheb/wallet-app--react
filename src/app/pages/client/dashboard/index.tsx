import "./style.css";
import { useState } from "react";

export default function DashboardPage() {
  const [stats] = useState({
    cards: 4,
    balance: 2450,
  });

  return (
    <div className="dashboard-container text-center">
      <h2 className="page-title">Welcome to your WalletPro App</h2>
      <p className="subtitle">View and manage your cards quickly.</p>

      {/* ====== SOLDE EN CERCLE ====== */}
      <div className="balance-circle mx-auto my-4">
        <div className="circle-inner">
          <h3 className="balance-amount">{stats.balance}TND</h3>
          <p className="balance-label">Balance</p>
        </div>
      </div>

      {/* ====== NOMBRE DE CARTES SEUL ====== */}
      <div className="cards-count my-3">
        <span className="cards-badge">
          <i className="bi bi-credit-card me-2"></i>
          {stats.cards} Cards
        </span>
      </div>
    </div>
  );
}
