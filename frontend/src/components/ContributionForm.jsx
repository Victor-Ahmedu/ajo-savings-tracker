import { useState } from "react";
import { createContribution } from "../api";
import "./ContributionForm.css";

function ContributionForm({ groupId, memberId, pin, onContributionAdded }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await createContribution({
      group_id: groupId,
      member_id: memberId,
      amount: Number(amount),
      pin,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setAmount("");
    onContributionAdded(result[0]);
  };

  return (
    <div>
      <form className="contribution-form" onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (₦)"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "..." : "Add"}
        </button>
      </form>
      {error && <p className="form-error-small">{error}</p>}
    </div>
  );
}

export default ContributionForm;
