import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";
interface AlertModalProps {
  show: boolean;
  title: string;
  message: React.ReactNode | string;
  onClose: () => void;
  redirect?: string; // optionnel : chemin vers lequel naviguer
}

export default function AlertComponent({
  show,
  title,
  message,
  onClose,
  redirect,
}: AlertModalProps) {
  const navigate = useNavigate();

  const handleOk = () => {
    if (redirect) navigate(redirect);
    onClose();
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      contentClassName="alert-card dark"
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleOk} className="mx-3">
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
