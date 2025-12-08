import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../api/axios";
import "./style.css"
interface ITransaction {
  _id: string;
  type: string;
  amount: number;
  sourceCard?: { holderName: string; cardNumber: string };
  destinationCard?: { holderName: string; cardNumber: string };
  createAt: Date;
}

export default function History() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get<{ docs: ITransaction[] }>("/transactions");
        setTransactions(res.data.docs);
      } catch (err: any) {
        console.error("Error fetching transactions:", err);
        toast.error(err.response?.data?.message || "Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="transaction-history mt-4">
      <h3 className="page-title mb-4">
        <i className="bi bi-clock-history me-2"></i> Transaction History
      </h3>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading transactions...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="alert alert-info">No transactions found.</div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {transactions.map((t) => (
            <div key={t._id} className="card shadow-sm border-0">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-bold mb-1">
                    {t.type.toLowerCase() === "transfer" ? (
                      <span className="badge bg-primary">Transfer</span>
                    ) : (
                      <span className="badge bg-success">Top-up</span>
                    )}
                  </h6>
                  <p className="mb-0 text-muted">
                    {new Date(t.createAt).toLocaleDateString()} •{" "}
                    {t.sourceCard
                      ? `${t.sourceCard.holderName} (${t.sourceCard.cardNumber})`
                      : "Wallet"}{" "}
                    →{" "}
                    {t.destinationCard
                      ? `${t.destinationCard.holderName} (${t.destinationCard.cardNumber})`
                      : "Wallet"}
                  </p>
                </div>
                <div className="text-end">
                  <span className="fw-bold text-success fs-5">
                    {t.amount.toFixed(2)} TND
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
