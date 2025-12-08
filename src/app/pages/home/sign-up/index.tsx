import React, { useState } from "react";
import axios from "../../../api/axios";
import { useNavigate , Link } from "react-router-dom";
import "./style.css"; // CSS personnalisé

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/sign-up", {
        firstName,
        lastName,
        email,
        password,
      });
      
      navigate(`/h/sign-up/${res.data.otp}`);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erreur inconnue");
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center">
      <div className="card auth-card shadow-lg p-4 rounded-4">
        <h3 className="text-center mb-4 fw-bold text-primary">Create Account</h3>
        <form onSubmit={handleSignUp} className="space-y-3">
          {error && (<div className="alert alert-danger">{error}</div>)}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                className="form-control"
                placeholder="Ben"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                className="form-control"
                placeholder="Foulen"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

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
            <i className="bi bi-person-plus me-2"></i> Sign Up
          </button>
        </form>
        <p className="text-center mt-3 text-muted">
          Already have an account?{" "}
          <Link to="/h/sign-in" className="text-primary fw-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
