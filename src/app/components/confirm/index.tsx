import {  Modal } from "react-bootstrap";

interface PropsConfirm {
  show: boolean;
  message: string;
  handel: () => void;
  onClose: () => void; // pour fermer le modal
}

export default function ConfirmComponent({
  show,
  message,
  handel,
  onClose,
}: PropsConfirm) {
  return (
    <Modal show={show} onHide={onClose} centered >
      <Modal.Header closeButton>
        <Modal.Title className="d-flex gap-2">
          <i className="bi bi-exclamation-triangle-fill fs-3 text-warning"></i>
          <span>confirm</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-outline-secondary px-4 py-2" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-danger px-4 py-2" onClick={handel}>
          <i className="bi bi-check-circle me-2"></i> Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
}
