import { Link } from "react-router-dom";
import ICard from "../../models/card.model";
import "./style.css"
import { QRCodeCanvas } from "qrcode.react";
interface CardProps {
  card: ICard;
}

export default function CardItemComponent({ card }: CardProps) {
  // Supposons que card.weeklyLimit = limite de la semaine
  // et card.amount = montant restant
  const remaining = card.weeklyLimit - card.spentThisWeek;

  // Définir la couleur du border
  let borderClass = "border-success"; // par défaut vert
  if (remaining <= 0) {
    borderClass = "border-danger"; // rouge si fini
  } else if (remaining <= card.weeklyLimit * 0.2) {
    borderClass = "border-warning"; // jaune si presque terminé (moins de 20%)
  }

  return (
    <Link
      to={`/dashboard/cards/${card._id}`}
      className={`wallet-card text-decoration-none card p-3 border-2 ${borderClass}`}
    >
      <div className="card-item shadow">
      <div className="card-info">
        <h5 className="card-title">Card Number</h5>
        <p className="card-number">{card.cardNumber}</p>
        <p className="card-holder">Holder name: {card.holderName} </p>
      </div>

      <div className="qr-code">
        {/* ✅ QR code généré à partir du numéro de carte */}
        <QRCodeCanvas value={card.cardNumber} size={128} level="H" includeMargin={true} />
      </div>
    </div>
    </Link>
  );
}
