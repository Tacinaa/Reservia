"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserRoleSelect({
  id,
  current,
}: {
  id: string;
  current: string;
}) {
  const router = useRouter();
  const [role, setRole] = useState(current);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function save() {
    setLoading(true);
    setMessage("");

    const response = await fetch(`/api/admin/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    const data = await response.json().catch(() => ({}));
    setLoading(false);

    if (!response.ok) {
      setMessage(data.message || "Erreur");
      return;
    }

    setMessage("Rôle mis à jour");
    router.refresh();
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            height: 42,
            borderRadius: 12,
            border: "1px solid rgba(31,26,23,0.12)",
            padding: "0 0.8rem",
            background: "#fff",
          }}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button
          onClick={save}
          disabled={loading}
          style={{
            height: 42,
            border: "none",
            borderRadius: 999,
            padding: "0 1rem",
            background: "#1f6b6b",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
            opacity: loading ? 0.75 : 1,
          }}
        >
          {loading ? "..." : "Mettre à jour"}
        </button>
      </div>

      {message && <p style={{ margin: 0, color: "#1f6b6b" }}>{message}</p>}
    </div>
  );
}