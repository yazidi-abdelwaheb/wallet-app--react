import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";
import api from "../../../../api/axios";

export default function OtpPage() {
  const { id } = useParams(); // récupère l'ID OTP depuis l'URL
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOtp = async () => {
      try {
        const res = await api.get(`/auth/otp/${id}`);
        const expiredAt = new Date(res.data.doc.expiredAt).getTime();
        const now = Date.now();
        const diff = Math.max(0, Math.floor((expiredAt - now) / 1000));
        setTimeLeft(diff);
      } catch (err: any) {
        console.error(err.response?.data?.error || err.message);
      }
    };
    fetchOtp();
  }, [id]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);


  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };


  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // 🔹 Soumission OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");

    try {
      const res = await api.post("/auth/sign-up/otp", { otpId : id , code });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.error || "OTP invalide");
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center">
      <div className="card auth-card shadow-lg p-4 rounded-4 text-center">
        <h3 className="fw-bold text-primary mb-3">Enter OTP</h3>
        <p className="text-muted mb-4">We sent a 6-digit code to your email</p>

        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center gap-2 mb-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="otp-input"
              />
            ))}
          </div>

          <button
            className="btn btn-gradient w-100 mt-3"
            type="submit"
            disabled={timeLeft <= 0}
          >
            Verify OTP
          </button>
        </form>

        <p className="mt-3 text-muted">
          Time left:{" "}
          <span className="fw-bold">
            {timeLeft > 0 ? formatTime(timeLeft) : "Expired"}
          </span>
        </p>
      </div>
    </div>
  );
}
