import { useState, useEffect } from "react";
import { getContributions } from "../api";
import ContributionForm from "./ContributionForm";
import "./MemberCard.css";

function MemberCard({ groupId, member, pin }) {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContributions() {
      const data = await getContributions(member.id);
      setContributions(data);
      setLoading(false);
    }

    fetchContributions();
  }, [member.id]);

  const total = contributions.reduce((sum, c) => sum + Number(c.amount), 0);

  const handleContributionAdded = (newContribution) => {
    setContributions((prev) => [...prev, newContribution]);
  };

  return (
    <div className="member-card">
      <div className="member-card-info">
        <h4>{member.name}</h4>
        <p className="member-total">
          {loading ? "Loading..." : `₦${total.toLocaleString()} saved so far`}
        </p>
      </div>
      <ContributionForm
        groupId={groupId}
        memberId={member.id}
        pin={pin}
        onContributionAdded={handleContributionAdded}
      />
    </div>
  );
}

export default MemberCard;
