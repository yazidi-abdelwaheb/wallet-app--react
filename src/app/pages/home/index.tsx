
import { Outlet, Link } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div>
      <nav>
        <Link to="/h">Home</Link>
        <Link to="/h/sign-in">Sign In</Link>
        <Link to="/h/sign-up">Sign Up</Link>
      </nav>
      <Outlet /> {/* Ici s’affichent les enfants */}
    </div>
  );
}
