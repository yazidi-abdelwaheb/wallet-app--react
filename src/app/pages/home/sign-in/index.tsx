import React, { useState } from "react";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/sign-in", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.error || "Erreur inconnue");
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card shadow-sm p-4">
        <h3 className="text-center mb-3">Sign In</h3>
        <form onSubmit={handleSignIn}>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
