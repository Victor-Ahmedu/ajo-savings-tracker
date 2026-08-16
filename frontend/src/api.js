const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getGroups() {
  const response = await fetch(`${API_URL}/groups`);
  return response.json();
}

export async function getGroupById(id) {
  const response = await fetch(`${API_URL}/groups/${id}`);
  return response.json();
}

export async function createGroup(groupData) {
  const response = await fetch(`${API_URL}/groups`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(groupData),
  });
  return response.json();
}

export async function getMembers(groupId) {
  const response = await fetch(`${API_URL}/members/${groupId}`);
  return response.json();
}

export async function createMember(memberData) {
  const response = await fetch(`${API_URL}/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(memberData),
  });
  return response.json();
}

export async function getContributions(memberId) {
  const response = await fetch(`${API_URL}/contributions/${memberId}`);
  return response.json();
}

export async function createContribution(contributionData) {
  const response = await fetch(`${API_URL}/contributions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contributionData),
  });
  return response.json();
}
