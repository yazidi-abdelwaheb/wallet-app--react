import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import "./style.css";
import api from "../../../../api/axios";
import { toast } from "react-toastify";

export default function Receive() {
  const [qrData, setQrData] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(true); // empêche double scan

  const handleScan = async (data: IDetectedBarcode[]) => {
    if (!isScanning) return;
    if (!data || data.length === 0) return;

    const value = data[0].rawValue;
    if (!value) return;

    setIsScanning(false); // stop scan pendant le fetch
    setQrData(value);

    try {
      const res = await api.get<{ cardNumber: string; holderName: string }>(
        `/cards/cardNumber/${value}`
      );

      setError("");
      setCardNumber(res.data.cardNumber);
      setHolderName(res.data.holderName);

    } catch (err: any) {
      console.error(err);
      setQrData(null);
      setError(err.response?.data?.message || "Card not found!");
      setIsScanning(true); // réactiver scan si erreur
    }
  };

  const handleError = (err: any) => {
    console.error("QR Scanner Error:", err);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post(`/cards/receive`, { cardNumber, cvv, amount });

      toast.success(
        `Transaction envoyée :
Card: ${cardNumber}
CVV: ${cvv}
Amount: ${amount}`
      );

      // reset
      setQrData(null);
      setCvv("");
      setAmount("");
      setIsScanning(true);

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Transaction failed!");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      {!qrData ? (
        <Card className="p-3 shadow-lg card" style={{ width: "500px" }}>
          <Card.Title className="text-center mb-3">Scan QR Code</Card.Title>

          {error && <div className="alert alert-danger">{error}</div>}

          <div style={{ width: "100%", margin: "auto" }}>
            <Scanner onScan={handleScan} onError={handleError} />
          </div>

          <p className="text-center mt-2">
            Place the QR code behind the camera
          </p>
        </Card>
      ) : (
        <Card className="p-4 shadow-lg card" style={{ width: "500px" }}>
          {error && <div className="alert alert-danger">{error}</div>}

          <Card.Title className="text-center">Card Information</Card.Title>
          <p className="fw-bold text-center">Card Number: {cardNumber}</p>
          <p className="fw-bold text-center">Holder Name: {holderName}</p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="password"
                maxLength={3}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Confirm Transaction
            </Button>
          </Form>
        </Card>
      )}
    </div>
  );
}
