"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type ReservationFormProps = {
  destinationId: string;
  availableFrom?: string | null;
  availableTo?: string | null;
};

export default function ReservationForm({
  destinationId,
  availableFrom,
  availableTo,
}: ReservationFormProps) {
  const router = useRouter();

  const [travelDate, setTravelDate] = useState("");
  const [persons, setPersons] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destinationId,
          travelDate,
          persons,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || "Erreur lors de la réservation");
        return;
      }

      setSuccess("Votre réservation a bien été enregistrée.");
      setTravelDate("");
      setPersons(1);
      router.refresh();
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div style={{ marginBottom: "0.3rem" }}>
        <p
          style={{
            margin: "0 0 0.45rem 0",
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            fontSize: "0.74rem",
            color: "#8a7d72",
          }}
        >
          Réservation
        </p>

        <h2
          style={{
            margin: "0 0 0.45rem 0",
            fontSize: "1.4rem",
            color: "#1f1a17",
            fontFamily:
              "'Playfair Display', Georgia, 'Times New Roman', serif",
            fontWeight: 600,
          }}
        >
          Réserver ce séjour
        </h2>

        <p
          style={{
            margin: 0,
            color: "#6b5f56",
            lineHeight: 1.7,
            fontSize: "0.98rem",
          }}
        >
          Choisissez votre date et le nombre de voyageurs pour finaliser votre demande.
        </p>
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <label
          htmlFor="travelDate"
          style={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#3f362f",
          }}
        >
          Date de départ
        </label>
        <input
          id="travelDate"
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          min={availableFrom || undefined}
          max={availableTo || undefined}
          required
          style={{
            height: "52px",
            borderRadius: "16px",
            border: "1px solid rgba(31,26,23,0.12)",
            padding: "0 1rem",
            background: "#fffdfb",
            color: "#1f1a17",
            fontSize: "1rem",
            outline: "none",
          }}
        />
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <label
          htmlFor="persons"
          style={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#3f362f",
          }}
        >
          Nombre de voyageurs
        </label>
        <input
          id="persons"
          type="number"
          min="1"
          value={persons}
          onChange={(e) => setPersons(Number(e.target.value))}
          required
          style={{
            height: "52px",
            borderRadius: "16px",
            border: "1px solid rgba(31,26,23,0.12)",
            padding: "0 1rem",
            background: "#fffdfb",
            color: "#1f1a17",
            fontSize: "1rem",
            outline: "none",
          }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: "0.4rem",
          height: "54px",
          border: "none",
          borderRadius: "999px",
          background: loading ? "#7aa6a6" : "#1f6b6b",
          color: "#ffffff",
          fontSize: "1rem",
          fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 14px 28px rgba(31,107,107,0.18)",
          transition: "all 0.2s ease",
        }}
      >
        {loading ? "Réservation en cours..." : "Réserver ce séjour"}
      </button>

      {error && (
        <p
          style={{
            margin: 0,
            color: "#a33b3b",
            background: "#fff1f1",
            border: "1px solid #f1caca",
            padding: "0.85rem 1rem",
            borderRadius: "14px",
            fontSize: "0.95rem",
          }}
        >
          {error}
        </p>
      )}

      {success && (
        <p
          style={{
            margin: 0,
            color: "#25634b",
            background: "#eefaf4",
            border: "1px solid #cfead9",
            padding: "0.85rem 1rem",
            borderRadius: "14px",
            fontSize: "0.95rem",
          }}
        >
          {success}
        </p>
      )}
    </form>
  );
}