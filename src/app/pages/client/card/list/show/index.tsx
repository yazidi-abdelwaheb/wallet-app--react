import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../../../api/axios";
import { useEffect, useState } from "react";
import ICard from "../../../../../models/card.model";
import CardItemComponent from "../../../../../components/card";

export default function Show() {
  const { id } = useParams();
  const [card, setCard] = useState<ICard | null>(null);
  const [topUpAmount, setTopUpAmount] = useState<number>(0);
  const [spendAmount, setSpendAmount] = useState<number>(0);
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
    if (topUpAmount <= 0) return alert("Montant invalide !");
    setLoading(true);
    try {
      await axiosInstance.post("/cards/topup", { cardId: id, amount: topUpAmount });
      alert(`Carte rechargée de ${topUpAmount}`);
      setTopUpAmount(0);
    } catch (err: any) {
      alert(err.response?.data?.error || "Erreur lors du rechargement");
    } finally {
      setLoading(false);
    }
  };

  const handleSpend = async () => {
    if (spendAmount <= 0) return alert("Montant invalide !");
    setLoading(true);
    try {
      await axiosInstance.post("/cards/spend", { cardId: id, amount: spendAmount });
      alert(`Vous avez dépensé ${spendAmount}`);
      setSpendAmount(0);
    } catch (err: any) {
      alert(err.response?.data?.error || "Erreur lors de la dépense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-card">
      <h3 className="page-title">Détails de la carte</h3>

      {card ? (
        <>
          <CardItemComponent card={card} />
          <hr />
          <p><strong>Solde :</strong> {card.amount} €</p>
          <p><strong>Dépenses semaine :</strong> {card.spentThisWeek} / {card.weeklyLimit} €</p>

          <div className="mb-2">
            <input
              type="number"
              className="form-control mb-1"
              placeholder="Montant à recharger"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(Number(e.target.value))}
              disabled={loading}
            />
            <button className="btn btn-success w-100" onClick={handleTopUp} disabled={loading}>
              <i className="bi bi-wallet2 me-1"></i> Recharger
            </button>
          </div>

          <div>
            <input
              type="number"
              className="form-control mb-1"
              placeholder="Montant à dépenser"
              value={spendAmount}
              onChange={(e) => setSpendAmount(Number(e.target.value))}
              disabled={loading}
            />
            <button className="btn btn-danger w-100" onClick={handleSpend} disabled={loading}>
              <i className="bi bi-cash-stack me-1"></i> Dépenser
            </button>
          </div>

          <div className="d-flex gap-2 mt-3">
            <Link to="edit" className="btn btn-warning w-50">
              <i className="bi bi-pencil"></i> Modifier
            </Link>
            <Link to="/dashboard/cards" className="btn btn-secondary w-50">
              Retour
            </Link>
          </div>
        </>
      ) : (
        <p>Chargement de la carte...</p>
      )}
    </div>
  );
}
