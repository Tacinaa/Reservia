import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import ReservationActions from "./ReservationActions";

export default async function AdminReservationsPage() {
  await requireAdmin();

  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      destination: true,
    },
  });

  return (
    <section style={{ display: "grid", gap: "1.5rem" }}>
      <div>
        <p style={{ margin: 0, color: "#8a7d72", textTransform: "uppercase" }}>
          Suivi opérationnel
        </p>
        <h2
          style={{
            margin: 0,
            fontSize: "2.5rem",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Réservations
        </h2>
      </div>

      <div style={{ display: "grid", gap: "0.9rem" }}>
        {reservations.map((r) => (
          <article
            key={r.id}
            style={{
              padding: "1rem",
              background: "#fff",
              borderRadius: "18px",
              border: "1px solid rgba(0,0,0,0.08)",
              display: "grid",
              gap: "0.7rem",
            }}
          >
            <strong>{r.destination.name}</strong>
            <p style={{ margin: 0, color: "#5f544c" }}>
              {r.user.firstName} {r.user.lastName} — {r.user.email}
            </p>
            <p style={{ margin: 0, color: "#7a6d63" }}>
              Date de voyage : {new Date(r.travelDate).toLocaleDateString("fr-FR")}
            </p>
            <p style={{ margin: 0, color: "#7a6d63" }}>
              {r.persons} personne(s) — {r.totalPrice} €
            </p>

            <ReservationActions id={r.id} current={r.status} />
          </article>
        ))}
      </div>
    </section>
  );
}