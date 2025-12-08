import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import ICard from "../../../../../models/card.model";

export default function Edit() {
  const [form, setForm] = useState({
    _id: "",
    holderName: "",
    weeklyLimit: 0,
    amount: 0, // ✅ ajouté
  });

  const { id } = useParams();
  const [error, setError] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await api.get<{ doc: ICard }>(`/cards/${id}`);
        setForm(res.data.doc);
      } catch (err) {
        console.error("Error fetching card:", err);
      }
    };

    if (id) fetchCard();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "weeklyLimit" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ validation corrigée
    if (form.weeklyLimit <= 0) {
      setError("Weekly limit must be greater to the 0.");
      return;
    }

    try {
      const res = await api.put<{ message: string }>(`/cards/${id}`, {card : form});

      toast.success("Card edited successfully!");
      setError("");
      navigate(`/dashboard/cards/${id}`)
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "An error occurred while editing the card."
      );
    }
  };

  return (
    <div className="form-card">
      <h3 className="page-title mb-5">Edit Card</h3>

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

        <button className="btn btn-warning w-100 mt-3">Edit Card</button>
      </form>
    </div>
  );
}
