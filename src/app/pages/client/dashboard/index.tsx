import "./style.css";
import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../../../api/axios";

export default function DashboardPage() {
  const [balance, setBalance] = useState<number>(0);

  const [error, setError] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await api.get<{ amount: number }>("/users/balance");
        setBalance(res.data.amount);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);
  const handleTopUp = async () => {
    if (amount <= 0) {
      setError("Please enter a valid amount!");
      return;
    }

    try {
      const res = await api.patch("/users/balance/recharge", {
        amount, // montant à recharger
      });

      toast.success(`You topped up ${amount} TND successfully!`);

      setBalance(balance + amount);

      setShowModal(false);
      setAmount(0);
      setError("");
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "An error occurred while topping up."
      );
    }
  };

  return (
    <div className="dashboard-container text-center mt-5">
      <h2 className="page-title">Welcome to your WalletPro App</h2>
      <p className="subtitle">View and manage your cards quickly.</p>

      {/* ====== SOLDE EN CERCLE ====== */}
      <div className="balance-circle mx-auto my-4">
        <div className="circle-inner">
          <h3 className="balance-amount">{balance} TND</h3>
          <p className="balance-label">Balance</p>
        </div>
      </div>

      {/* ====== BOUTON TOP UP ====== */}
      <div className="cards-count my-3">
        <button
          className="cards-badge btn btn-gradient"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-credit-card me-2"></i>
          Top up my Balance
        </button>
      </div>

      {/* ====== MODAL ====== */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <i className="bi bi-wallet2 me-2"></i> Top Up Balance
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter Amount (TND)</Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="e.g. 100"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleTopUp}>
            <i className="bi bi-check-circle me-2"></i> Confirm Top Up
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
