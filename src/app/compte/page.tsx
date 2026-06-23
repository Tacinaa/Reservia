import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CancelReservationButton } from "@/components/CancelReservationButton";

export default async function ComptePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      reservations: {
        include: { destination: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <main
      style={{
        background: "#f6f1eb",
        color: "#1f1a17",
        minHeight: "100vh",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          <div>
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                fontSize: "0.78rem",
                color: "#8a7d72",
                marginBottom: "0.8rem",
              }}
            >
              Espace personnel
            </p>
            <h1
              style={{
                fontSize: "clamp(2.6rem, 5vw, 4.8rem)",
                lineHeight: 1.02,
                marginBottom: "0.6rem",
                fontFamily:
                  "'Playfair Display', Georgia, 'Times New Roman', serif",
                fontWeight: 600,
              }}
            >
              Mon compte
            </h1>
            <p style={{ color: "#5f544c", lineHeight: 1.8, fontSize: "1.03rem" }}>
              Retrouvez vos informations personnelles et l'historique de vos séjours réservés.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.82)",
              border: "1px solid rgba(31,26,23,0.08)",
              borderRadius: "28px",
              padding: "1.8rem",
              boxShadow: "0 14px 34px rgba(68,49,33,0.06)",
              display: "grid",
              gap: "1rem",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "1.2rem",
                fontFamily:
                  "'Playfair Display', Georgia, 'Times New Roman', serif",
              }}
            >
              Informations personnelles
            </h2>

            {[
              ["Prénom", user.firstName],
              ["Nom", user.lastName],
              ["Email", user.email],
              ["Rôle", user.role === "ADMIN" ? "Administrateur" : "Voyageur"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid rgba(31,26,23,0.06)",
                }}
              >
                <span style={{ color: "#8a7d72", fontSize: "0.9rem" }}>
                  {label}
                </span>
                <span style={{ fontWeight: 600, textAlign: "right" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1rem 2rem 5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              fontFamily:
                "'Playfair Display', Georgia, 'Times New Roman', serif",
              fontWeight: 600,
            }}
          >
            Mes réservations
          </h2>

          <Link
            href="/reservations"
            style={{
              textDecoration: "none",
              color: "#1f6b6b",
              fontWeight: 600,
            }}
          >
            Vue complète
          </Link>
        </div>

        {user.reservations.length === 0 ? (
          <div
            style={{
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(31,26,23,0.08)",
              borderRadius: "30px",
              padding: "2.5rem",
              boxShadow: "0 14px 34px rgba(68,49,33,0.06)",
            }}
          >
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                fontSize: "0.78rem",
                color: "#8a7d72",
                marginBottom: "0.8rem",
              }}
            >
              Aucun voyage pour le moment
            </p>
            <h3
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                marginBottom: "1rem",
                fontFamily:
                  "'Playfair Display', Georgia, 'Times New Roman', serif",
              }}
            >
              Commencez à préparer votre prochaine escapade.
            </h3>
            <Link
              href="/destinations"
              style={{
                display: "inline-block",
                textDecoration: "none",
                background: "#1f6b6b",
                color: "#ffffff",
                padding: "0.9rem 1.3rem",
                borderRadius: "999px",
                fontWeight: 600,
                boxShadow: "0 12px 26px rgba(31,107,107,0.18)",
              }}
            >
              Découvrir les destinations
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "1.2rem" }}>
            {user.reservations.map((reservation) => (
              <article
                key={reservation.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(180px, 260px) 1fr",
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(31,26,23,0.08)",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 12px 28px rgba(68,49,33,0.06)",
                }}
              >
                {reservation.destination.image ? (
                  <Image
                    src={reservation.destination.image}
                    alt={reservation.destination.name}
                    width={520}
                    height={400}
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "200px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      minHeight: "200px",
                      background:
                        "linear-gradient(135deg, #d8cabd 0%, #efe5db 100%)",
                    }}
                  />
                )}

                <div
                  style={{
                    padding: "1.4rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.9rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: "0 0 0.3rem 0",
                          fontSize: "1.5rem",
                          fontFamily:
                            "'Playfair Display', Georgia, 'Times New Roman', serif",
                          fontWeight: 600,
                        }}
                      >
                        {reservation.destination.name}
                      </h3>
                      <p style={{ margin: 0, color: "#6f635a" }}>
                        {reservation.destination.country}
                        {reservation.destination.city
                          ? `, ${reservation.destination.city}`
                          : ""}
                      </p>
                    </div>

                    <div
                      style={{
                        padding: "0.48rem 0.8rem",
                        borderRadius: "999px",
                        background: "rgba(31,107,107,0.10)",
                        color: "#1f6b6b",
                        fontWeight: 700,
                        fontSize: "0.92rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {reservation.totalPrice} €
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(130px, 1fr))",
                      gap: "0.6rem",
                    }}
                  >
                    {[
                      [
                        "Date de départ",
                        new Date(reservation.travelDate).toLocaleDateString(
                          "fr-FR"
                        ),
                      ],
                      [
                        "Voyageurs",
                        `${reservation.persons} personne${reservation.persons > 1 ? "s" : ""}`,
                      ],
                      ["Statut", reservation.status],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        style={{
                          background: "#fffaf6",
                          borderRadius: "14px",
                          padding: "0.75rem",
                          border: "1px solid rgba(31,26,23,0.06)",
                        }}
                      >
                        <p
                          style={{
                            margin: "0 0 0.25rem 0",
                            color: "#8a7d72",
                            fontSize: "0.82rem",
                          }}
                        >
                          {label}
                        </p>
                        <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem" }}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "0.8rem",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      href={`/destinations/${reservation.destination.id}`}
                      style={{
                        textDecoration: "none",
                        background: "#1f1a17",
                        color: "#ffffff",
                        padding: "0.75rem 1.1rem",
                        borderRadius: "999px",
                        fontWeight: 600,
                        fontSize: "0.92rem",
                      }}
                    >
                      Voir la destination
                    </Link>
                    <CancelReservationButton id={reservation.id} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
