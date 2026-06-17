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
    <button type="button" onClick={handleCancel} disabled={loading}>
      {loading ? "Annulation..." : "Annuler"}
    </button>
  );
}