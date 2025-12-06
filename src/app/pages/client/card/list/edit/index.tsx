import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSave = (e: any) => {
    e.preventDefault();
    alert("Modifications enregistrées !");
    navigate(`/dashboard/cards/${id}`);
  };

  return (
    <div className="app-card">
      <h3 className="page-title">Modifier la carte</h3>
      <p className="text-muted">Carte ID : {id}</p>

      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label className="mb-1">Nom</label>
          <input className="form-control" defaultValue="Carte Travel" />
        </div>

        <button className="btn btn-primary w-100">Enregistrer</button>
      </form>
    </div>
  );
}
