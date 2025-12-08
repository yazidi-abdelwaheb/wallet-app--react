import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../../../api/axios";
import { useEffect, useState } from "react";
import ICard from "../../../../../models/card.model";
import CardItemComponent from "../../../../../components/card";
import { toast } from "react-toastify";

export default function Show() {
  const { id } = useParams();
  const [card, setCard] = useState<ICard | null>(null);
  const [topUpAmount, setTopUpAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await axiosInstance.get<{ doc: ICard }>(`/cards/${id}`);
        setCard(res.data.doc);
      } catch (err) {
        console.error("Error fetching card:", err);
      }
    };

    if (id) fetchCard();
  }, [id]);

  const handleTopUp = async () => {
    if (!topUpAmount || topUpAmount <= 0) {
      toast.error("Please enter a valid amount!");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.patch(`/cards/${id}/recharge`, {
        cardId: id,
        amount: topUpAmount,
      });

      toast.success(`Card topped up with ${topUpAmount} TND`);

      // ✅ mettre à jour le solde local
      setCard((prev) =>
        prev ? { ...prev, amount: prev.amount + topUpAmount } : prev
      );

      setTopUpAmount(0);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Error during top-up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-card">
      <h3 className="page-title">Card details</h3>

      {card ? (
        <>
          <CardItemComponent card={card} />
          <hr />
          <p>
            <strong>Sold :</strong> {card.amount} TND
          </p>
          <p>
            <strong>Weekly expenses:</strong> {card.spentThisWeek} /{" "}
            {card.weeklyLimit} TND
          </p>
          <hr />
          <div className="mb-2">
            <input
              type="number"
              className="form-control mb-1"
              placeholder="Amount to top up"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(Number(e.target.value))}
              disabled={loading}
            />
            <button
              className="btn btn-success w-100"
              onClick={handleTopUp}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : (
                <i className="bi bi-wallet2 me-1"></i>
              )}
              Recharge
            </button>
          </div>

          <hr />
          <div className="d-flex gap-2 mt-3">
            <Link to="edit" className="btn btn-warning w-50">
              <i className="bi bi-pencil"></i> Edit
            </Link>
            <Link to="/dashboard/cards" className="btn btn-secondary w-50">
              Back to list
            </Link>
          </div>
        </>
      ) : (
        <p>Loading card...</p>
      )}
    </div>
  );
}
