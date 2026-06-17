import Link from "next/link";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  const destinations = await prisma.destination.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const isLoggedIn = !!session?.user;
  const firstName =
    session?.user?.name?.split(" ")[0] ||
    session?.user?.email?.split("@")[0] ||
    "voyageur";

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
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          padding: "4rem 2rem",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, rgba(246,241,235,0.92) 0%, rgba(236,226,214,0.78) 45%, rgba(220,205,188,0.55) 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontSize: "0.78rem",
                color: "#7b6e63",
                marginBottom: "1rem",
              }}
            >
              {isLoggedIn ? `Bon retour, ${firstName}` : "Voyages d’exception"}
            </p>

            <h1
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5.8rem)",
                lineHeight: 1,
                marginBottom: "1.5rem",
                fontFamily:
                  "'Playfair Display', Georgia, 'Times New Roman', serif",
                fontWeight: 600,
                maxWidth: "11ch",
              }}
            >
              {isLoggedIn
                ? "Votre prochaine parenthèse commence ici."
                : "Des séjours pensés pour respirer ailleurs."}
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "#5f544c",
                maxWidth: "58ch",
                marginBottom: "2rem",
              }}
            >
              {isLoggedIn
                ? "Retrouvez vos réservations, explorez de nouvelles destinations et poursuivez votre expérience dans un espace pensé pour voyager avec fluidité."
                : "Explorez des destinations soigneusement sélectionnées, avec une expérience de réservation simple, fluide et élégante."}
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/destinations"
                style={{
                  background: "#1f6b6b",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "0.95rem 1.4rem",
                  borderRadius: "999px",
                  fontWeight: 600,
                  boxShadow: "0 12px 30px rgba(31,107,107,0.18)",
                }}
              >
                Découvrir les destinations
              </Link>

              {isLoggedIn ? (
                <Link
                  href="/reservations"
                  style={{
                    color: "#1f1a17",
                    textDecoration: "none",
                    padding: "0.95rem 1.4rem",
                    borderRadius: "999px",
                    border: "1px solid rgba(31,26,23,0.14)",
                    background: "rgba(255,255,255,0.55)",
                    fontWeight: 600,
                  }}
                >
                  Voir mes réservations
                </Link>
              ) : (
                <Link
                  href="/register"
                  style={{
                    color: "#1f1a17",
                    textDecoration: "none",
                    padding: "0.95rem 1.4rem",
                    borderRadius: "999px",
                    border: "1px solid rgba(31,26,23,0.14)",
                    background: "rgba(255,255,255,0.55)",
                  }}
                >
                  Créer un compte
                </Link>
              )}
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: "-30px auto auto -20px",
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: "rgba(31,107,107,0.12)",
                filter: "blur(10px)",
              }}
            />
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80"
              alt="Paysage de voyage"
              width={1400}
              height={1000}
              style={{
                width: "100%",
                height: "min(72vh, 720px)",
                objectFit: "cover",
                borderRadius: "28px",
                boxShadow: "0 30px 60px rgba(54, 40, 30, 0.18)",
              }}
            />
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "5rem 2rem 2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "end",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          <div>
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                fontSize: "0.78rem",
                color: "#8a7d72",
                marginBottom: "0.7rem",
              }}
            >
              {isLoggedIn ? "Inspirations pour votre prochain départ" : "Sélection du moment"}
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                lineHeight: 1.1,
                fontFamily:
                  "'Playfair Display', Georgia, 'Times New Roman', serif",
                fontWeight: 600,
              }}
            >
              Destinations récentes
            </h2>
          </div>

          <Link
            href="/destinations"
            style={{
              textDecoration: "none",
              color: "#1f6b6b",
              fontWeight: 600,
            }}
          >
            Voir tout
          </Link>
        </div>

        {destinations.length === 0 ? (
          <p style={{ color: "#6f655d" }}>
            Aucune destination disponible pour le moment.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {destinations.map((destination) => (
              <article
                key={destination.id}
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(31,26,23,0.08)",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 12px 30px rgba(70, 52, 38, 0.06)",
                  backdropFilter: "blur(6px)",
                }}
              >
                {destination.image ? (
                  <img
                    src={destination.image}
                    alt={destination.name}
                    width={800}
                    height={520}
                    style={{
                      width: "100%",
                      height: "240px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "240px",
                      background:
                        "linear-gradient(135deg, #d7c7b6 0%, #eee4d9 100%)",
                    }}
                  />
                )}

                <div style={{ padding: "1.3rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "1rem",
                      alignItems: "start",
                      marginBottom: "0.8rem",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: "1.35rem",
                          marginBottom: "0.35rem",
                          fontFamily:
                            "'Playfair Display', Georgia, 'Times New Roman', serif",
                        }}
                      >
                        {destination.name}
                      </h3>
                      <p style={{ color: "#7a6d63", margin: 0 }}>
                        {destination.country}
                        {destination.city ? `, ${destination.city}` : ""}
                      </p>
                    </div>

                    <div
                      style={{
                        whiteSpace: "nowrap",
                        padding: "0.45rem 0.75rem",
                        borderRadius: "999px",
                        background: "#efe7de",
                        color: "#4b4038",
                        fontWeight: 600,
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
                      marginBottom: "1.2rem",
                    }}
                  >
                    {destination.shortDesc}
                  </p>

                  <Link
                    href={`/destinations/${destination.id}`}
                    style={{
                      textDecoration: "none",
                      color: "#1f6b6b",
                      fontWeight: 600,
                    }}
                  >
                    Voir la destination
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.2rem",
          }}
        >
          {[
            [
              "Sélection soignée",
              "Des destinations choisies pour leur atmosphère, leur singularité et leur qualité d’expérience.",
            ],
            [
              "Réservation fluide",
              "Une expérience simple, claire et rapide, sans étapes inutiles ni surcharge visuelle.",
            ],
            [
              "Esprit premium",
              "Une présentation élégante pensée pour inspirer confiance et envie dès la première visite.",
            ],
          ].map(([title, text]) => (
            <div
              key={title}
              style={{
                background: "#fffaf6",
                borderRadius: "22px",
                padding: "1.5rem",
                border: "1px solid rgba(31,26,23,0.07)",
              }}
            >
              <h3
                style={{
                  marginBottom: "0.8rem",
                  fontSize: "1.15rem",
                }}
              >
                {title}
              </h3>
              <p style={{ color: "#655a52", lineHeight: 1.7 }}>{text}</p>
            </div>
          ))}
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
            borderRadius: "30px",
            padding: "2.2rem",
            background: "#1f1a17",
            color: "#f6f1eb",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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
                color: "#b9aba0",
                marginBottom: "0.8rem",
              }}
            >
              {isLoggedIn ? "Votre espace voyage" : "Prêt à partir"}
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.1,
                fontFamily:
                  "'Playfair Display', Georgia, 'Times New Roman', serif",
                marginBottom: "0.9rem",
              }}
            >
              {isLoggedIn
                ? "Retrouvez vos réservations et préparez votre prochain départ."
                : "Trouvez votre prochain voyage en quelques minutes."}
            </h2>
            <p style={{ color: "#d4c8bf", lineHeight: 1.7 }}>
              {isLoggedIn
                ? "Accédez à vos séjours enregistrés, consultez les détails utiles et continuez votre exploration des destinations."
                : "Parcourez nos destinations, comparez les ambiances et réservez facilement votre prochaine parenthèse."}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              href={isLoggedIn ? "/reservations" : "/destinations"}
              style={{
                textDecoration: "none",
                background: "#f4ede5",
                color: "#1f1a17",
                padding: "0.95rem 1.4rem",
                borderRadius: "999px",
                fontWeight: 700,
              }}
            >
              {isLoggedIn ? "Voir mes réservations" : "Explorer maintenant"}
            </Link>

            <Link
              href={isLoggedIn ? "/destinations" : "/login"}
              style={{
                textDecoration: "none",
                color: "#f6f1eb",
                padding: "0.95rem 1.4rem",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              {isLoggedIn ? "Explorer d’autres destinations" : "Se connecter"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}