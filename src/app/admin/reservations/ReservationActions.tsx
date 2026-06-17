"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReservationActions({
  id,
  current,
}: {
  id: string;
  current: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(current);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function save() {
    setLoading(true);
    setMessage("");

    const response = await fetch(`/api/admin/reservations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const data = await response.json().catch(() => ({}));
    setLoading(false);

    if (!response.ok) {
      setMessage(data.message || "Erreur");
      return;
    }

    setMessage("Statut mis à jour");
    router.refresh();
  }

  async function removeReservation() {
    if (!window.confirm("Supprimer cette réservation ?")) return;

    const response = await fetch(`/api/admin/reservations/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Suppression impossible");
      return;
    }

    router.refresh();
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            height: 42,
            borderRadius: 12,
            border: "1px solid rgba(31,26,23,0.12)",
            padding: "0 0.8rem",
            background: "#fff",
          }}
        >
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="PENDING">PENDING</option>
          <option value="CANCELLED">CANCELLED</option>
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

        <button
          onClick={removeReservation}
          style={{
            height: 42,
            borderRadius: 999,
            border: "1px solid rgba(31,26,23,0.12)",
            padding: "0 1rem",
            background: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Supprimer
        </button>
      </div>

      {message && <p style={{ margin: 0, color: "#1f6b6b" }}>{message}</p>}
    </div>
  );
}