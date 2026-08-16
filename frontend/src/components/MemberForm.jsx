import { useState } from "react";
import { createMember } from "../api";
import "./MemberForm.css";

function MemberForm({ groupId, onMemberAdded }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newMember = await createMember({ group_id: groupId, name });

    setLoading(false);
    setName("");
    setSubmitted(true);
    onMemberAdded(newMember[0]);
  };

  if (submitted) {
    return (
      <p className="member-form-success">
        Request sent! The group admin needs to approve it before you appear as a
        member.
      </p>
    );
  }

  return (
    <form className="member-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Requesting..." : "Request to Join"}
      </button>
    </form>
  );
}

export default MemberForm;
