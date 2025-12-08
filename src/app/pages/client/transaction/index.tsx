import { Nav } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import "./style.css";

export default function TransactionLayout() {
  return (
    <>
      <h2 className="fw-bold">Transactions</h2>
      <p>Make secure transfers and view your history.</p>

      <Nav variant="tabs" defaultActiveKey="dashboard/transactions"  className="d-flex justify-content-center gap-3 mb-3">
        <Nav.Item className="trans-item">
          <Nav.Link as={NavLink} to="/dashboard/transactions/send">
            <i className="bi bi-send-plus-fill icon"></i>
            Send
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className="trans-item">
          <Nav.Link as={NavLink} to="/dashboard/transactions/receive">
            <i className="bi bi-download icon"></i>
            Receive
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className="trans-item">
          <Nav.Link as={NavLink} to="/dashboard/transactions/history">
            <i className="bi bi-clock-history icon"></i>
            History
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div>
        <Outlet />
      </div>
    </>
  );
}
