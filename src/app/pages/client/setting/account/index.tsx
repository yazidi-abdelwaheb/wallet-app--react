import { useState } from "react";
import "./style.css";

export default function AccountSetting() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    username: "",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    twoFactor: false,
  });

  
  const handleSecurityChange = (e : any) => {
    setSecurity({ ...security, [e.target.name]: e.target.value });
  };

  const toggle2FA = () => {
    setSecurity({ ...security, twoFactor: !security.twoFactor });
  };

  

  const handlePasswordSave = (e : any) => {
    e.preventDefault();
    alert("Password updated!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      alert("Account deleted.");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-2">Account Settings</h2>
      <p className=" mb-4">
        Manage your profile and your security settings.
      </p>

      {/* PASSWORD SECTION */}
      <div className="card shadow-sm p-4 mb-4">
        <h5 className="mb-3">Change Password</h5>
        <form onSubmit={handlePasswordSave}>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              placeholder="Enter your current password..."
              className="form-control"
              name="currentPassword"
              value={security.currentPassword}
              onChange={handleSecurityChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">New Password</label>
            <input
              type="password"
              placeholder="Enter your new password..."
              className="form-control"
              name="newPassword"
              value={security.newPassword}
              onChange={handleSecurityChange}
            />
          </div>

          <button className="btn btn-primary px-4">Update Password</button>
        </form>
      </div>

      {/* 2FA SECTION */}
      <div className="card shadow-sm p-4 mb-4">
        <h5 className="mb-3">Security</h5>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>Two-Factor Authentication</strong>
            <p className="text-muted small mb-0">
              Add more security to your account.
            </p>
          </div>

          <div className="form-check form-switch fs-4">
            <input
              className="form-check-input"
              type="checkbox"
              checked={true}
              onChange={toggle2FA}
            />
          </div>
        </div>
      </div>

      {/* DELETE ACCOUNT */}
      <div className="card shadow-sm p-4 border-danger">
        <h5 className="text-danger mb-2">Delete Account</h5>
        <p className="text-muted">
          Permanently remove your account and all data. This action cannot be undone.
        </p>
        <button className="btn btn-danger px-4" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
