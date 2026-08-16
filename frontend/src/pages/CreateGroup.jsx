import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupForm from "../components/GroupForm";
import "./CreateGroup.css";

function CreateGroup() {
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleGroupCreated = (newGroup) => {
    setSuccessMessage(`"${newGroup.name}" was created successfully!`);

    setTimeout(() => {
      navigate("/dashboard");
    }, 2600);
  };

  return (
    <div className="create-group-page">
      <h1>Create a New Ajo Group</h1>
      <p className="create-group-subtitle">
        Set up your group's details below. You can add members once it's
        created.
      </p>

      {successMessage && <div className="success-banner">{successMessage}</div>}

      <GroupForm onGroupCreated={handleGroupCreated} />
    </div>
  );
}

export default CreateGroup;
