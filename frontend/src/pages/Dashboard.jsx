import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGroups } from "../api";
import "./Dashboard.css";

function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGroups() {
      const data = await getGroups();
      setGroups(data);
      setLoading(false);
    }

    fetchGroups();
  }, []);

  if (loading) {
    return <p className="dashboard-loading">Loading groups...</p>;
  }

  return (
    <div className="dashboard-page">
      <h1>Your Ajo Groups</h1>

      {groups.length === 0 ? (
        <div className="dashboard-empty">
          <p>No groups yet.</p>
          <Link to="/create-group" className="dashboard-empty-link">
            Create your first group
          </Link>
        </div>
      ) : (
        <div className="groups-grid">
          {groups.map((group) => (
            <Link
              to={`/groups/${group.id}`}
              className="group-card"
              key={group.id}
            >
              <h3>{group.name}</h3>
              <p className="group-card-detail">
                ₦{Number(group.contribution_amount).toLocaleString()} ·{" "}
                {group.frequency}
              </p>
              <p className="group-card-creator">
                Created by {group.created_by}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
