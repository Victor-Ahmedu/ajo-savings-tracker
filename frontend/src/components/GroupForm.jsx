import { useState } from "react";
import { createGroup } from "../api";
import "./GroupForm.css";

function GroupForm({ onGroupCreated }) {
  const [name, setName] = useState("");
  const [contributionAmount, setContributionAmount] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [createdBy, setCreatedBy] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await createGroup({
      name,
      contribution_amount: Number(contributionAmount),
      frequency,
      created_by: createdBy,
      pin,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setName("");
    setContributionAmount("");
    setCreatedBy("");
    setPin("");

    onGroupCreated(result[0]);
  };

  return (
    <form className="group-form" onSubmit={handleSubmit}>
      <h2>Create a New Ajo Group</h2>

      <label>
        Group Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Market Women Ajo"
          required
        />
      </label>

      <label>
        Contribution Amount (₦)
        <input
          type="number"
          value={contributionAmount}
          onChange={(e) => setContributionAmount(e.target.value)}
          placeholder="e.g. 5000"
          required
        />
      </label>

      <label>
        Frequency
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </label>

      <label>
        Your Name (Group Creator)
        <input
          type="text"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          placeholder="e.g. Victor"
          required
        />
      </label>

      <label>
        Admin PIN (min. 4 digits)
        <input
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Choose a PIN only you'll know"
          minLength={4}
          required
        />
        <span className="field-hint">
          You'll need this PIN to approve members and record contributions
          later. Keep it safe — it can't be recovered.
        </span>
      </label>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Group"}
      </button>
    </form>
  );
}

export default GroupForm;
