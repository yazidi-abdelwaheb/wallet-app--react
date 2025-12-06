import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../providers/auth.providers";

interface TokenPayload {
  role: string;
}

export default function IsAdmin({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  if (!token) return <Navigate to="/sign-in" replace />;

  const decoded = jwtDecode<TokenPayload>(token);
  
  if (decoded.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
