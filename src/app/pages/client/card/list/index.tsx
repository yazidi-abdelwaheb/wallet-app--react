import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ICard from "../../../../models/card.model";
import axios from "../../../../api/axios";
import CardItemComponent from "../../../../components/card";

export default function List() {
  const [cards, setCards] = useState<ICard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const res = await axios.get<{ docs: ICard[]; totalPages?: number }>(
          `/cards?page=${page}&search=${search}&isActive=true&isDeleted=false`
        );

        if (page === 1) {
          setCards(res.data.docs);
        } else {
          setCards((prev) => [...prev, ...res.data.docs]);
        }

        // ✅ si l’API renvoie totalPages
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // ✅ reset pagination quand on change la recherche
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3 align-items-center">
        <h3 className="fw-bold">My Cards</h3>
        <Link to="add" className="btn btn-primary px-3">
          <i className="bi bi-plus-lg"></i> Add New Card
        </Link>
      </div>

      {/* ✅ Zone de recherche */}
      <div className="mb-4 d-flex justify-content-end">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by holder name..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {cards && cards.length > 0 ? (
        <div className="d-flex flex-wrap column-gap-5 row-gap-3 justify-content-center align-items-center">
          {cards.map((card) => (
            <CardItemComponent key={card._id} card={card} />
          ))}
        </div>
      ) : (
        !loading && <p>No cards available</p>
      )}

      {loading && <p className="text-center mt-3">Loading...</p>}

      {hasMore && !loading && (
        <button
          className="btn btn-primary mt-5 w-100 fw-bold"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Show more
        </button>
      )}
    </>
  );
}
