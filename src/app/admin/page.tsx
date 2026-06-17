import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [usersCount, destinationsCount, reservationsCount, latestReservations] =
    await Promise.all([
      prisma.user.count(),
      prisma.destination.count(),
      prisma.reservation.count(),
      prisma.reservation.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        include: {
          user: true,
          destination: true,
        },
      }),
    ]);

  const cards = [
    { label: "Utilisateurs", value: usersCount },
    { label: "Destinations", value: destinationsCount },
    { label: "Réservations", value: reservationsCount },
  ];

  return (
    <section style={{ display: "grid", gap: "1.5rem" }}>
      <div>
        <p
          style={{
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            fontSize: "0.78rem",
            color: "#8a7d72",
            marginBottom: "0.8rem",
          }}
        >
          Vue d’ensemble
        </p>
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.05,
            fontFamily:
              "'Playfair Display', Georgia, 'Times New Roman', serif",
          }}
        >
          Tableau de bord admin
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {cards.map((card) => (
          <article
            key={card.label}
            style={{
              background: "rgba(255,255,255,0.82)",
              border: "1px solid rgba(31,26,23,0.08)",
              borderRadius: "24px",
              padding: "1.4rem",
              boxShadow: "0 12px 28px rgba(70,52,38,0.06)",
            }}
          >
            <p style={{ margin: 0, color: "#7a6d63", marginBottom: "0.45rem" }}>
              {card.label}
            </p>
            <p style={{ margin: 0, fontSize: "2rem", fontWeight: 700 }}>
              {card.value}
            </p>
          </article>
        ))}
      </div>

      <section
        style={{
          background: "rgba(255,255,255,0.82)",
          border: "1px solid rgba(31,26,23,0.08)",
          borderRadius: "24px",
          padding: "1.4rem",
          boxShadow: "0 12px 28px rgba(70,52,38,0.06)",
        }}
      >
        <h3
          style={{
            margin: "0 0 1rem 0",
            fontSize: "1.4rem",
            fontFamily:
              "'Playfair Display', Georgia, 'Times New Roman', serif",
          }}
        >
          Réservations récentes
        </h3>

        <div style={{ display: "grid", gap: "0.8rem" }}>
          {latestReservations.map((reservation) => (
            <article
              key={reservation.id}
              style={{
                padding: "1rem",
                borderRadius: "18px",
                border: "1px solid rgba(31,26,23,0.08)",
                background: "#fffdfa",
              }}
            >
              <strong>{reservation.destination.name}</strong>
              <p style={{ margin: "0.4rem 0", color: "#5f544c" }}>
                {reservation.user.firstName} {reservation.user.lastName}
              </p>
              <p style={{ margin: 0, color: "#7a6d63", fontSize: "0.94rem" }}>
                {reservation.persons} personne(s) — {reservation.status} —{" "}
                {reservation.totalPrice} €
              </p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}