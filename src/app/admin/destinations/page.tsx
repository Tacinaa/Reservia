import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import DestinationManager from "./DestinationManager";

export default async function AdminDestinationsPage() {
  await requireAdmin();

  const destinations = await prisma.destination.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section style={{ display: "grid", gap: "1.5rem" }}>
      <div>
        <p style={{ margin: 0, color: "#8a7d72", textTransform: "uppercase" }}>
          Gestion contenu
        </p>
        <h2
          style={{
            margin: 0,
            fontSize: "2.5rem",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Destinations
        </h2>
      </div>

      <DestinationManager destinations={destinations} />
    </section>
  );
}