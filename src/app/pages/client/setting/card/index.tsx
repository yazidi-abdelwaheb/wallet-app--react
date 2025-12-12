import { useEffect, useState } from "react";
import "./style.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ICard from "../../../../models/card.model";
import api from "../../../../api/axios";
import { toast } from "react-toastify";
import ConfirmComponent from "../../../../components/confirm";

export default function CardSetting() {
  const [cards, setCards] = useState<ICard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // état pour la confirmation
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const res = await api.get<{ docs: ICard[]; totalPages?: number }>(
          `/cards?page=${page}&search=${search}&isDeleted=false`
        );

        if (page === 1) {
          setCards(res.data.docs);
        } else {
          setCards((prev) => [...prev, ...res.data.docs]);
        }

        if (res.data.totalPages && page >= res.data.totalPages) {
          setHasMore(false);
        } else if (!res.data.docs.length) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (err) {
        console.error("Error fetching cards:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [page, search]);

  const toggleActive = async (id: string) => {
    try {
      await api.patch(`/cards/toggleActive/${id}`);
      toast.success("Status changed successfully");
      setCards((prev) =>
        prev.map((c) => (c._id === id ? { ...c, isActive: !c.isActive } : c))
      );
    } catch (error) {
      toast.error("Error server, Please try again later!");
      console.error(error);
    }
  };

  // ouvrir le modal de confirmation
  const deleteCard = (id: string) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  // action confirmée
  const handleConfirmDelete = async () => {
    if (selectedId) {
      try {
        await api.delete(`/cards/${selectedId}`); // appel API pour supprimer côté serveur
        setCards((prev) => prev.filter((c) => c._id !== selectedId));
        toast.success("Card deleted successfully");
      } catch (error) {
        toast.error("Error deleting card, please try again later!");
        console.error(error);
      } finally {
        setShowConfirm(false);
        setSelectedId(null);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="fw-bold mb-4">Cards Settings</h2>

      <div className="mb-4 w-100 d-flex justify-content-end">
        <div className="input-group w-50">
          <input
            type="search"
            placeholder="search by holder name..."
            onChange={(e) => setSearch(e.target.value.trim())}
            className="form-control"
          />
        </div>
      </div>

      {/* CARDS LIST */}
      <div className="list-group">
        {cards.map((card) => (
          <div
            key={card._id}
            className="d-flex justify-content-between align-items-center py-3 mb-3 card-item-setting"
          >
            {/* Card Info */}
            <div className="d-flex flex-column">
              <span className="fw-semibold">{card.holderName}</span>
              <small>{card.cardNumber}</small>
            </div>

            {/* Actions */}
            <div className="d-flex align-items-center gap-3">
              {/* Deactivate toggle */}
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">
                    {card.isActive ? "Deactivate" : "Activate"}
                  </Tooltip>
                }
              >
                <span className="d-inline-block">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={card.isActive}
                      onChange={() => toggleActive(card._id)}
                    />
                  </div>
                </span>
              </OverlayTrigger>

              {/* Delete */}
              <button
                className="btn btn-link text-danger p-0 fs-4"
                onClick={() => deleteCard(card._id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
        {hasMore && !loading && (
          <button
            className="btn btn-primary mt-5 w-100 fw-bold"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Show more
          </button>
        )}
      </div>

      {/* Modal de confirmation */}
      <ConfirmComponent
        show={showConfirm}
        message="Are you sure you want to delete this card?"
        handel={handleConfirmDelete}
        onClose={() => setShowConfirm(false)}
      />
    </div>
  );
}
