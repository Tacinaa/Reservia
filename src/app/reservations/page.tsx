import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ReservationsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const reservations = await prisma.reservation.findMany({
    where: {
      userId: user.id,
    },
    include: {
      destination: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

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
            alignItems: "center",
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
                marginBottom: "1rem",
                fontFamily:
                  "'Playfair Display', Georgia, 'Times New Roman', serif",
                fontWeight: 600,
              }}
            >
              Mes réservations
            </h1>

            <p
              style={{
                color: "#5f544c",
                lineHeight: 1.8,
                maxWidth: "58ch",
                fontSize: "1.03rem",
              }}
            >
              Retrouvez ici l’ensemble de vos séjours réservés, leurs dates de départ
              et les informations essentielles pour suivre vos prochains voyages.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(31,26,23,0.08)",
              borderRadius: "28px",
              padding: "1.8rem",
              boxShadow: "0 14px 34px rgba(68,49,33,0.06)",
            }}
          >
            <p
              style={{
                margin: "0 0 0.5rem 0",
                color: "#8a7d72",
                fontSize: "0.9rem",
              }}
            >
              Total de réservations
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "3rem",
                lineHeight: 1,
                fontWeight: 700,
                color: "#1f1a17",
              }}
            >
              {reservations.length}
            </p>
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
        {reservations.length === 0 ? (
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

            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                lineHeight: 1.1,
                marginBottom: "1rem",
                fontFamily:
                  "'Playfair Display', Georgia, 'Times New Roman', serif",
                fontWeight: 600,
              }}
            >
              Commencez à préparer votre prochaine escapade.
            </h2>

            <p
              style={{
                color: "#5f544c",
                lineHeight: 1.8,
                maxWidth: "60ch",
                marginBottom: "1.5rem",
              }}
            >
              Vous n’avez encore enregistré aucune réservation. Parcourez nos
              destinations et trouvez le séjour qui vous correspond.
            </p>

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
          <div
            style={{
              display: "grid",
              gap: "1.4rem",
            }}
          >
            {reservations.map((reservation) => (
              <article
                key={reservation.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(220px, 320px) 1fr",
                  gap: "0",
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(31,26,23,0.08)",
                  borderRadius: "28px",
                  overflow: "hidden",
                  boxShadow: "0 14px 34px rgba(68,49,33,0.06)",
                }}
              >
                {reservation.destination.image ? (
                  <Image
                    src={reservation.destination.image}
                    alt={reservation.destination.name}
                    width={900}
                    height={700}
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "260px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      minHeight: "260px",
                      background:
                        "linear-gradient(135deg, #d8cabd 0%, #efe5db 100%)",
                    }}
                  />
                )}

                <div
                  style={{
                    padding: "1.6rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "1rem",
                      alignItems: "start",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: "0 0 0.5rem 0",
                          color: "#8a7d72",
                          textTransform: "uppercase",
                          letterSpacing: "0.14em",
                          fontSize: "0.75rem",
                        }}
                      >
                        Voyage réservé
                      </p>

                      <h2
                        style={{
                          margin: "0 0 0.4rem 0",
                          fontSize: "1.8rem",
                          fontFamily:
                            "'Playfair Display', Georgia, 'Times New Roman', serif",
                          fontWeight: 600,
                        }}
                      >
                        {reservation.destination.name}
                      </h2>

                      <p
                        style={{
                          margin: 0,
                          color: "#6f635a",
                        }}
                      >
                        {reservation.destination.country}
                        {reservation.destination.city
                          ? `, ${reservation.destination.city}`
                          : ""}
                      </p>
                    </div>

                    <div
                      style={{
                        padding: "0.55rem 0.9rem",
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
                        "repeat(auto-fit, minmax(160px, 1fr))",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        background: "#fffaf6",
                        borderRadius: "18px",
                        padding: "1rem",
                        border: "1px solid rgba(31,26,23,0.06)",
                      }}
                    >
                      <p
                        style={{
                          margin: "0 0 0.35rem 0",
                          color: "#8a7d72",
                          fontSize: "0.88rem",
                        }}
                      >
                        Date de départ
                      </p>
                      <p style={{ margin: 0, fontWeight: 700 }}>
                        {new Date(reservation.travelDate).toLocaleDateString(
                          "fr-FR"
                        )}
                      </p>
                    </div>

                    <div
                      style={{
                        background: "#fffaf6",
                        borderRadius: "18px",
                        padding: "1rem",
                        border: "1px solid rgba(31,26,23,0.06)",
                      }}
                    >
                      <p
                        style={{
                          margin: "0 0 0.35rem 0",
                          color: "#8a7d72",
                          fontSize: "0.88rem",
                        }}
                      >
                        Voyageurs
                      </p>
                      <p style={{ margin: 0, fontWeight: 700 }}>
                        {reservation.persons} personne
                        {reservation.persons > 1 ? "s" : ""}
                      </p>
                    </div>

                    <div
                      style={{
                        background: "#fffaf6",
                        borderRadius: "18px",
                        padding: "1rem",
                        border: "1px solid rgba(31,26,23,0.06)",
                      }}
                    >
                      <p
                        style={{
                          margin: "0 0 0.35rem 0",
                          color: "#8a7d72",
                          fontSize: "0.88rem",
                        }}
                      >
                        Réservation effectuée
                      </p>
                      <p style={{ margin: 0, fontWeight: 700 }}>
                        {new Date(reservation.createdAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: "#5f544c",
                        lineHeight: 1.7,
                      }}
                    >
                      Retrouvez les détails complets de cette destination à tout moment.
                    </p>

                    <Link
                      href={`/destinations/${reservation.destination.id}`}
                      style={{
                        textDecoration: "none",
                        background: "#1f1a17",
                        color: "#ffffff",
                        padding: "0.85rem 1.15rem",
                        borderRadius: "999px",
                        fontWeight: 600,
                      }}
                    >
                      Voir la destination
                    </Link>
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