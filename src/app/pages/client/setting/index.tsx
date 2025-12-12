import { NavLink, Outlet } from "react-router-dom";
import "./style.css";

export default function SettingLayout() {
  return (
    <div className="d-flex min-vh-100 settings-container">
      
      {/* SIDEBAR */}
      <aside className="border-end settings-sidebar">
        <h2 className="fw-bold mb-4 ms-4 mt-3">Settings</h2>

        <nav className="d-flex flex-column gap-3 settings-menu">
          <NavLink to="account" className="item text-decoration-none">
            <div className="fw-bold">Account Setting</div>
            <span className="small d-block mt-2">
              Manage your private information
            </span>
          </NavLink>

          <NavLink to="card" className="item text-decoration-none">
            <div className="fw-bold">Card Settings</div>
            <span className="small d-block mt-2">
              Manage your cards and payment preferences
            </span>
          </NavLink>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-grow-1 p-5 settings-content">
        <Outlet />
      </main>
    </div>
  );
}
