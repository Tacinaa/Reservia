import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Destinations</h1>

      {destinations.length === 0 ? (
        <p>Aucune destination disponible pour le moment.</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
          {destinations.map((destination) => (
            <div
              key={destination.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "1rem",
              }}
            >
              <h2>{destination.name}</h2>
              <p><strong>Pays :</strong> {destination.country}</p>
              <p><strong>Ville :</strong> {destination.city}</p>
              <p><strong>Prix :</strong> {destination.basePrice} €</p>
              <p>{destination.shortDesc}</p>

              <Link href={`/destinations/${destination.id}`}>
                Voir plus
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}