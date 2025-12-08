import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";  
import "./style.css";
import api from "../../../../api/axios";

export default function Receive() {
  const [qrData, setQrData] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("")
  const [holderName, setHolderName] = useState("")
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("")

  const handleScan = async (data: IDetectedBarcode[]) => {
    if (data && data.length > 0) {
      setQrData(data[0].rawValue);
      try {
        const res = await api.get<{cardNumber : string, holderName : string}>(`/cards/cardNumber/${data[0].rawValue}`)
        setError("")
        setCardNumber(res.data.cardNumber)
        setHolderName(res.data.holderName)
      } catch (error : any) {
        console.error(error)
        setQrData(null)
        setError(error.response?.data?.message || "Card not found!")
      }
    }
  };

  const handleError = (err: any) => {
    console.error("QR Scanner Error:", err);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Transaction envoyée:\nCard: ${qrData}\nCVV: ${cvv}\nAmount: ${amount}`
    );
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      {!qrData ? (
        <Card className="p-3 shadow-lg card" style={{ width: "500px"  }}>
          <Card.Title className="text-center mb-3">Scan QR Code</Card.Title>
          {error && (<div className="alert alert-danger"> {error} </div>)}
          <div style={{ width: "100%", margin: "auto" }}>
            <Scanner
              onScan={handleScan}
              onError={handleError}
            />
          </div>
          <p className="text-center mt-2">
            Place the QR code behind the camera
          </p>
        </Card>
        
      ) : (
        <Card className="p-4 shadow-lg card" style={{ width: "500px"}}>
            {error && (<div className="alert alert-danger"> {error} </div>)}
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
