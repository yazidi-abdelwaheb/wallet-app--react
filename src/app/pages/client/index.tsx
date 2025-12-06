import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./style.css";

export default function ClientLayout() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  const handleLogout = () => navigate("/h/sign-in");

  return (
    <div className={dark ? "app dark" : "app"}>
      {/* ======== NAV-TOP ======== */}
      <nav className="top-nav shadow-sm">
        <div className="left">
          <h2 className="logo">WalletPro</h2>
        </div>

        <div className="right d-flex">
          {/* DARK MODE BUTTON */}
          <button className="icon-btn" onClick={() => setDark(!dark)}>
            <i className={dark ? "bi bi-sun" : "bi bi-moon"}></i>
          </button>

          {/* USER DROPDOWN */}
          <div className="dropdown ms-3">
            <button
              className="dropdown-toggle btn btn-outline-light"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-person-circle me-1"></i>
              My Profile
            </button>

            <ul className="dropdown-menu dropdown-menu-end shadow">
              <li>
                <NavLink className="dropdown-item" to="/dashboard/my-profile">
                  <i className="bi bi-person me-2"></i>
                  Profile
                </NavLink>
              </li>

              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ======== CONTENT ======== */}
      <div className="content-wrapper">
        {/* ======== SIDEBAR ======== */}
        <aside className="sidebar">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/cards"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <i className="bi bi-credit-card me-2"></i> My Cards
          </NavLink>

          <NavLink
            to="/dashboard/transactions"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <i className="bi bi-cash-coin me-2"></i> Transactions
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <i className="bi bi-gear me-2"></i> Settings
          </NavLink>
        </aside>

        {/* ======== PAGE CONTENT ======== */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
