import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/auth.providers";

export default function IsAuth({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  if (!token) return <Navigate to="/sign-in" replace />;

  return children;
}
