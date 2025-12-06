import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/auth.providers";


export default function IsGuest({ children }: { children :  React.ReactNode }) {
  const { token } = useAuth();

  if (token) return <Navigate to="/dashboard" replace />;

  return children;
}
