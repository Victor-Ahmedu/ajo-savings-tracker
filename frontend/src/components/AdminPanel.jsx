import { useState } from "react";
import "./AdminPanel.css";

const API_URL = "http://localhost:5000";

function AdminPanel({ groupId, children }) {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const handleUnlock = async (e) => {
    e.preventDefault();
    setChecking(true);
    setError("");

    const response = await fetch(`${API_URL}/groups/${groupId}/verify-pin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });
    const result = await response.json();

    setChecking(false);

    if (result.valid) {
      setUnlocked(true);
    } else {
      setError("Incorrect PIN.");
    }
  };

  if (unlocked) {
    return <div className="admin-panel-unlocked">{children(pin)}</div>;
  }

  return (
    <div className="admin-panel-locked">
      <h3>Admin Access</h3>
      <p>Enter the group PIN to approve members and record contributions.</p>
      <form onSubmit={handleUnlock} className="admin-panel-form">
        <input
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter PIN"
          required
        />
        <button type="submit" disabled={checking}>
          {checking ? "Checking..." : "Unlock"}
        </button>
      </form>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

export default AdminPanel;
