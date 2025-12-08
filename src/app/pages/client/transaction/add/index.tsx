import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../../api/axios";
import { toast } from "react-toastify";
import ICard from "../../../../models/card.model";

export default function Transaction() {
  const [form, setForm] = useState({
    sourceCard: "",
    destinationCard: "",
    cvv: "",
    amount: 0,
  });
  const [error, setError] = useState<string>("");
  const [myCards, setMyCards] = useState<ICard[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await api.get("/cards/all");
        setMyCards(res.data.doc);
      } catch (err: any) {
        console.error("Transaction error:", err);
      }
    };
    fetchCards();
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/transactions", {
        sourceCard: form.sourceCard,
        destinationCard: form.destinationCard,
        amount: form.amount,
        cvv: form.cvv,
      });

      // ✅ feedback utilisateur
      toast.success(
        `Transaction of ${form.amount} TND completed successfully!`
      );

      // ✅ reset du formulaire
      setForm({
        sourceCard: "",
        destinationCard: "",
        cvv: "",
        amount: 0,
      });
      setError('')
    } catch (err: any) {
      console.error("Transaction error:", err);
      setError(
        err.response?.data?.message || "An error occurred during transaction."
      );
    }
  };
  return (
    <div className="transaction-container">

      {error && <div className="alert alert-danger mb-2">{error}</div>}
      {/* ====== Formulaire ====== */}
      <form
        onSubmit={handleSubmit}
        className="transaction-form shadow-sm p-4 rounded"
      >
        <div className="mb-3">
          <label className="form-label">Select Source Card</label>
          <select
            name="sourceCard"
            className="form-select"
            value={form.sourceCard}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose a card --</option>
            {myCards.map((card , index)=>{
                return <option key={index} value={card.cardNumber}>{card.holderName}</option>
            })}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Destination Card Number</label>
          <input
            type="text"
            name="destinationCard"
            className="form-control"
            placeholder="Enter destination card number"
            value={form.destinationCard}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">CVV (Secure)</label>
          <input
            type="password"
            name="cvv"
            className="form-control"
            placeholder="******"
            maxLength={6}
            value={form.cvv}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Amount (TND)</label>
          <input
            type="number"
            name="amount"
            className="form-control"
            min={1}
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-success w-100">
          <i className="bi bi-arrow-right-circle me-2"></i> Submit Transaction
        </button>
      </form>

      {/* ====== Historique mocké ====== */}
    </div>
  );
}
