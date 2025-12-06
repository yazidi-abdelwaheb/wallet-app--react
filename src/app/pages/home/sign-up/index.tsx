import React, { useState } from "react";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import "./style.css"; // CSS personnalisé

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/sign-up", { name, email, password });
      alert("Compte créé ! ID: " + res.data.userId);
      navigate("/sign-in");
    } catch (err: any) {
      alert(err.response?.data?.error || "Erreur inconnue");
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card shadow-sm p-4">
        <h3 className="text-center mb-3">Créer un compte</h3>
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}
