"use client";

import { useState } from "react";

export function CancelReservationButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  async function handleCancel() {
    setLoading(true);

    const res = await fetch(`/api/reservations/${id}`, {
      method: "DELETE",
    });

    setLoading(false);

    if (res.ok) {
      window.location.reload();
    } else {
      alert("Impossible d’annuler la réservation.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleCancel}
      disabled={loading}
      style={{
        height: "40px",
        borderRadius: "999px",
        border: "1px solid rgba(163,59,59,0.3)",
        padding: "0 1rem",
        background: loading ? "#f9f0f0" : "#fff1f1",
        color: "#a33b3b",
        fontWeight: 600,
        cursor: loading ? "not-allowed" : "pointer",
        fontSize: "0.9rem",
      }}
    >
      {loading ? "Annulation..." : "Annuler la réservation"}
    </button>
  );
}