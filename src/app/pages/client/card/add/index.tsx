import { useState } from "react";
import axios from "../../../../api/axios";
import "./style.css";
import AlertComponent from "../../../../components/alert";
import { toast } from "react-toastify";

export default function Add() {
  const [form, setForm] = useState({
    weeklyLimit: 0,
    amount: 0,
    holderName: ""
  });

  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [cvv, setCvv] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "amount" || name === "weeklyLimit" ? Number(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.weeklyLimit >  form.amount) {
      setError("Weekly limit must be greater or equal to amount.");
      return;
    } else {
      setError("");
    }

    try {
      const res = await axios.post<{ message: string; cvv: string }>("/cards", {
        card: form,
      });

      setError("");
      setCvv(res.data.cvv);
      toast.success("Card added successfully!");
      setShowSuccess(true);

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred while creating the card.");
    }
  };

  return (
    <div className="form-card">
      <h3 className="page-title mb-5">Add New Card</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card-form">
        <div className="mb-3">
          <label className="form-label">Holder Name</label>
          <input
            type="text"
            name="holderName"
            placeholder="Enter the holder name"
            className="form-control"
            value={form.holderName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Amount (TND)</label>
          <input
            type="number"
            name="amount"
            min={1}
            className="form-control"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Weekly Limit (TND)</label>
          <input
            type="number"
            name="weeklyLimit"
            min={1}
            className="form-control"
            value={form.weeklyLimit}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary w-100 mt-3">Save Card</button>
      </form>

      {/* ✅ Modal de succès */}
      <AlertComponent
        show={showSuccess}
        title="Success"
        message={
          <>
            Your card has been added successfully.
            <br /><br />
            Please note that your CVV
            <span
              style={{
                background: "#f0f0f0",
                padding: "2px 6px",
                borderRadius: "4px",
                margin: "5px"
              }}
            >
              {cvv}
            </span>
            is confidential.
            <br />
            For security reasons, it will only be shown once.
            <br />
            Make sure to save it securely, as you will need it to authorize
            future transactions.
          </>
        }
        onClose={() => setShowSuccess(false)}
        redirect="/dashboard/cards"
      />
    </div>
  );
}
