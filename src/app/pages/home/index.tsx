import { Outlet, NavLink } from "react-router-dom";
import "./style.css";

export default function HomeLayout() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">WalletPro</div>
        <ul className="navbar-links">
          <li>
            <NavLink to="/h">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/h/sign-in" >
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink to="/h/sign-up" >
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
      <main >
        <Outlet />
      </main>
    </div>
  );
}
