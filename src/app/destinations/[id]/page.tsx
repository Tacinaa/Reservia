import Link from "next/link";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DestinationDetailPage({ params }: PageProps) {
  const { id } = await params;

  const destination = await prisma.destination.findUnique({
    where: { id },
  });

  if (!destination) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Destination introuvable</h1>
        <Link href="/destinations">Retour aux destinations</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{destination.name}</h1>

      <p><strong>Pays :</strong> {destination.country}</p>
      <p><strong>Ville :</strong> {destination.city}</p>
      <p><strong>Prix :</strong> {destination.basePrice} €</p>

      <p style={{ marginTop: "1rem" }}>{destination.description}</p>

      <div style={{ marginTop: "1rem" }}>
        <p>
          <strong>Disponible du :</strong>{" "}
          {destination.availableFrom
            ? new Date(destination.availableFrom).toLocaleDateString("fr-FR")
            : "Non précisé"}
        </p>
        <p>
          <strong>Disponible jusqu’au :</strong>{" "}
          {destination.availableTo
            ? new Date(destination.availableTo).toLocaleDateString("fr-FR")
            : "Non précisé"}
        </p>
      </div>

      <button
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem 1rem",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#0070f3",
          color: "white",
          cursor: "pointer",
        }}
      >
        Réserver
      </button>
    </main>
  );
}