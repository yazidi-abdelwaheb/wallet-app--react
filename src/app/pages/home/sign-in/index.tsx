import React, { useState } from "react";
import api from "../../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/sign-in", { email, password });

      if (res.data?.otp) {
        navigate(`/h/sign-in/${res.data.otp}`);
      } else {
        console.warn("Pas d'OTP dans la réponse");
      }
    } catch (err: any) {
      console.error(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center">
      <div className="card auth-card shadow-lg p-4 rounded-4">
        <h3 className="text-center mb-4 fw-bold text-primary">Welcome Back</h3>
        <p className="text-center text-muted mb-4">
          Sign in to continue to <span className="fw-bold">WalletPro</span>
        </p>
        <form onSubmit={handleSignIn}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              placeholder="example@mail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              placeholder="********"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-gradient w-100 mt-3" type="submit">
            <i className="bi bi-box-arrow-in-right me-2"></i> Sign In
          </button>
        </form>
        <p className="text-center mt-3 text-muted">
          Don’t have an account?{" "}
          <Link to="/h/sign-up" className="text-primary fw-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
