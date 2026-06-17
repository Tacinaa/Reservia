"use client";

import { useState } from "react";

export function DeleteDestinationButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette destination ?"
    );

    if (!confirmed) return;

    setLoading(true);

    const res = await fetch(`/api/destinations/${id}`, {
      method: "DELETE",
    });

    setLoading(false);

    if (res.ok) {
      window.location.reload();
    } else {
      alert("Impossible de supprimer la destination.");
    }
  }

  return (
    <button type="button" onClick={handleDelete} disabled={loading}>
      {loading ? "Suppression..." : "Supprimer"}
    </button>
  );
}