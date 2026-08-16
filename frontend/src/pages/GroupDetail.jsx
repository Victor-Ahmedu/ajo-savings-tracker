import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGroupById, getMembers } from "../api";
import MemberForm from "../components/MemberForm";
import MemberCard from "../components/MemberCard";
import AdminPanel from "../components/AdminPanel";
import "./GroupDetail.css";

const API_URL = "http://localhost:5000";

function GroupDetail() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const groupData = await getGroupById(id);
      const membersData = await getMembers(id);
      setGroup(groupData);
      setMembers(membersData);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  const handleMemberAdded = (newMember) => {
    setMembers((prev) => [...prev, newMember]);
  };

  const approveMember = async (memberId, pin) => {
    const response = await fetch(`${API_URL}/members/${memberId}/approve`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group_id: id, pin }),
    });
    const result = await response.json();

    if (result[0]) {
      setMembers((prev) =>
        prev.map((m) => (m.id === memberId ? result[0] : m)),
      );
    }
  };

  if (loading) {
    return <p className="group-detail-loading">Loading group...</p>;
  }

  const approvedMembers = members.filter((m) => m.status === "approved");
  const pendingMembers = members.filter((m) => m.status === "pending");

  return (
    <div className="group-detail-page">
      <div className="group-detail-header">
        <h1>{group.name}</h1>
        <p>
          ₦{Number(group.contribution_amount).toLocaleString()} ·{" "}
          {group.frequency} · Created by {group.created_by}
        </p>
      </div>

      <section className="group-detail-section">
        <h2>Request to Join</h2>
        <MemberForm groupId={id} onMemberAdded={handleMemberAdded} />
      </section>

      <section className="group-detail-section">
        <h2>Members ({approvedMembers.length})</h2>

        {approvedMembers.length === 0 ? (
          <p className="group-detail-empty">No approved members yet.</p>
        ) : (
          <AdminPanel groupId={id}>
            {(pin) =>
              approvedMembers.map((member) => (
                <MemberCard
                  groupId={id}
                  member={member}
                  pin={pin}
                  key={member.id}
                />
              ))
            }
          </AdminPanel>
        )}
      </section>

      {pendingMembers.length > 0 && (
        <section className="group-detail-section">
          <h2>Pending Requests ({pendingMembers.length})</h2>
          <AdminPanel groupId={id}>
            {(pin) =>
              pendingMembers.map((member) => (
                <div className="pending-member-row" key={member.id}>
                  <span>{member.name}</span>
                  <button
                    className="approve-btn"
                    onClick={() => approveMember(member.id, pin)}
                  >
                    Approve
                  </button>
                </div>
              ))
            }
          </AdminPanel>
        </section>
      )}
    </div>
  );
}

export default GroupDetail;
