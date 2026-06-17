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
          padding: "5rem 2rem 3rem",
          borderBottom: "1px solid rgba(31,26,23,0.08)",
          background:
            "linear-gradient(180deg, rgba(246,241,235,1) 0%, rgba(240,231,221,0.9) 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
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
              Collection de voyages
            </p>

            <h1
              style={{
                fontSize: "clamp(2.7rem, 5vw, 5rem)",
                lineHeight: 1.02,
                marginBottom: "1.2rem",
                fontFamily:
                  "'Playfair Display', Georgia, 'Times New Roman', serif",
                fontWeight: 600,
                maxWidth: "10ch",
              }}
            >
              Choisissez la destination qui vous ressemble.
            </h1>

            <p
              style={{
                fontSize: "1.06rem",
                lineHeight: 1.8,
                color: "#5f544c",
                maxWidth: "58ch",
              }}
            >
              Parcourez des séjours soigneusement présentés, comparez les
              ambiances et trouvez l’escapade idéale selon vos envies.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80"
              alt="Destination élégante"
              width={1400}
              height={900}
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
                borderRadius: "28px",
                boxShadow: "0 28px 60px rgba(68, 49, 33, 0.16)",
              }}
            />
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 2rem 5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          <div>
            <p
              style={{
                color: "#8a7d72",
                marginBottom: "0.35rem",
              }}
            >
              {destinations.length} destination
              {destinations.length > 1 ? "s" : ""} disponible
              {destinations.length > 1 ? "s" : ""}
            </p>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontFamily:
                  "'Playfair Display', Georgia, 'Times New Roman', serif",
                fontWeight: 600,
              }}
            >
              Nos sélections
            </h2>
          </div>

          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#1f6b6b",
              fontWeight: 600,
            }}
          >
            Retour à l’accueil
          </Link>
        </div>

        {destinations.length === 0 ? (
          <div
            style={{
              background: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(31,26,23,0.08)",
              borderRadius: "24px",
              padding: "2rem",
            }}
          >
            <p style={{ color: "#5f544c", margin: 0 }}>
              Aucune destination disponible pour le moment.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.6rem",
            }}
          >
            {destinations.map((destination) => (
              <article
                key={destination.id}
                style={{
                  background: "rgba(255,255,255,0.78)",
                  border: "1px solid rgba(31,26,23,0.08)",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 14px 34px rgba(68, 49, 33, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {destination.image ? (
                  <img
                    src={destination.image}
                    alt={destination.name}
                    width={900}
                    height={600}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "250px",
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
                    gap: "1rem",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: "1.4rem",
                          marginBottom: "0.35rem",
                          fontFamily:
                            "'Playfair Display', Georgia, 'Times New Roman', serif",
                          fontWeight: 600,
                        }}
                      >
                        {destination.name}
                      </h3>
                      <p style={{ color: "#7b6f65", margin: 0 }}>
                        {destination.country}
                        {destination.city ? `, ${destination.city}` : ""}
                      </p>
                    </div>

                    <div
                      style={{
                        padding: "0.48rem 0.8rem",
                        borderRadius: "999px",
                        background: "#efe7de",
                        color: "#4e433b",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        fontSize: "0.92rem",
                      }}
                    >
                      {destination.basePrice} €
                    </div>
                  </div>

                  <p
                    style={{
                      color: "#5f544c",
                      lineHeight: 1.75,
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    {destination.shortDesc}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        color: "#8a7d72",
                        fontSize: "0.95rem",
                      }}
                    >
                      Expérience soigneusement sélectionnée
                    </span>

                    <Link
                      href={`/destinations/${destination.id}`}
                      style={{
                        textDecoration: "none",
                        background: "#1f6b6b",
                        color: "#fff",
                        padding: "0.82rem 1.15rem",
                        borderRadius: "999px",
                        fontWeight: 600,
                        boxShadow: "0 10px 24px rgba(31,107,107,0.16)",
                      }}
                    >
                      Voir le détail
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