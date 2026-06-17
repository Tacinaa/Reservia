import { prisma } from "@/lib/prisma";
import ReservationForm from "@/components/ReservationForm";

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
      <main
        style={{
          minHeight: "100vh",
          background: "#f6f1eb",
          color: "#1f1a17",
          padding: "4rem 2rem",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1
            style={{
              fontFamily:
                "'Playfair Display', Georgia, 'Times New Roman', serif",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              marginBottom: "1rem",
            }}
          >
            Destination introuvable
          </h1>
          <p style={{ color: "#5f544c" }}>
            La destination demandée n’existe pas ou n’est plus disponible.
          </p>
        </div>
      </main>
    );
  }

  const mainImage =
    typeof destination.image === "string" ? destination.image.trim() : "";

  const cleanedGallery = Array.isArray(destination.gallery)
    ? [
        ...new Set(
          destination.gallery
            .filter((value) => typeof value === "string")
            .map((value) => value.trim())
            .filter(
              (value) =>
                value !== "" &&
                value !== mainImage &&
                (value.startsWith("http://") || value.startsWith("https://"))
            )
        ),
      ]
    : [];

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
          padding: "2.5rem 2rem 4rem",
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
            {mainImage ? (
              <img
                src={mainImage}
                alt={destination.name}
                width={1400}
                height={900}
                style={{
                  width: "100%",
                  height: "560px",
                  objectFit: "cover",
                  borderRadius: "30px",
                  boxShadow: "0 28px 60px rgba(68,49,33,0.16)",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "560px",
                  borderRadius: "30px",
                  background:
                    "linear-gradient(135deg, #d8cabd 0%, #efe5db 100%)",
                }}
              />
            )}

            {cleanedGallery.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0.9rem",
                  marginTop: "1rem",
                }}
              >
                {cleanedGallery.slice(0, 3).map((imageUrl, index) => (
                  <img
                    key={`${destination.id}-gallery-${index}`}
                    src={imageUrl}
                    alt={`${destination.name} - vue ${index + 1}`}
                    width={500}
                    height={350}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "140px",
                      objectFit: "cover",
                      borderRadius: "18px",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              position: "sticky",
              top: "110px",
              alignSelf: "start",
            }}
          >
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                fontSize: "0.78rem",
                color: "#8a7d72",
                marginBottom: "0.9rem",
              }}
            >
              Destination signature
            </p>

            <h1
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4.6rem)",
                lineHeight: 1.02,
                marginBottom: "1rem",
                fontFamily:
                  "'Playfair Display', Georgia, 'Times New Roman', serif",
                fontWeight: 600,
              }}
            >
              {destination.name}
            </h1>

            <p
              style={{
                fontSize: "1.05rem",
                color: "#6f635a",
                marginBottom: "1.4rem",
              }}
            >
              {destination.country}
              {destination.city ? `, ${destination.city}` : ""}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.7rem",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  padding: "0.55rem 0.85rem",
                  borderRadius: "999px",
                  background: "#efe7de",
                  color: "#4e433b",
                  fontWeight: 600,
                  fontSize: "0.92rem",
                }}
              >
                À partir de {destination.basePrice} €
              </span>

              <span
                style={{
                  padding: "0.55rem 0.85rem",
                  borderRadius: "999px",
                  background: "rgba(31,107,107,0.10)",
                  color: "#1f6b6b",
                  fontWeight: 600,
                  fontSize: "0.92rem",
                }}
              >
                Réservation disponible
              </span>
            </div>

            <p
              style={{
                color: "#5f544c",
                lineHeight: 1.85,
                fontSize: "1.02rem",
                marginBottom: "1.8rem",
              }}
            >
              {destination.shortDesc || destination.description}
            </p>

            <div
              style={{
                background: "rgba(255,255,255,0.74)",
                border: "1px solid rgba(31,26,23,0.08)",
                borderRadius: "24px",
                padding: "1.4rem",
                boxShadow: "0 14px 34px rgba(68,49,33,0.08)",
                marginBottom: "1.4rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                }}
              >
                Informations clés
              </h2>

              <div
                style={{
                  display: "grid",
                  gap: "0.9rem",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: "0 0 0.2rem 0",
                      color: "#8a7d72",
                      fontSize: "0.9rem",
                    }}
                  >
                    Pays
                  </p>
                  <p style={{ margin: 0, fontWeight: 600 }}>
                    {destination.country}
                  </p>
                </div>

                <div>
                  <p
                    style={{
                      margin: "0 0 0.2rem 0",
                      color: "#8a7d72",
                      fontSize: "0.9rem",
                    }}
                  >
                    Ville
                  </p>
                  <p style={{ margin: 0, fontWeight: 600 }}>
                    {destination.city || "Non précisée"}
                  </p>
                </div>

                <div>
                  <p
                    style={{
                      margin: "0 0 0.2rem 0",
                      color: "#8a7d72",
                      fontSize: "0.9rem",
                    }}
                  >
                    Disponibilité
                  </p>
                  <p style={{ margin: 0, fontWeight: 600 }}>
                    {destination.availableFrom
                      ? new Date(destination.availableFrom).toLocaleDateString(
                          "fr-FR"
                        )
                      : "Non précisé"}{" "}
                    —{" "}
                    {destination.availableTo
                      ? new Date(destination.availableTo).toLocaleDateString(
                          "fr-FR"
                        )
                      : "Non précisé"}
                  </p>
                </div>

                <div>
                  <p
                    style={{
                      margin: "0 0 0.2rem 0",
                      color: "#8a7d72",
                      fontSize: "0.9rem",
                    }}
                  >
                    Tarif de départ
                  </p>
                  <p style={{ margin: 0, fontWeight: 600 }}>
                    {destination.basePrice} €
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#fffaf6",
                borderRadius: "24px",
                padding: "1.4rem",
                border: "1px solid rgba(31,26,23,0.08)",
              }}
            >
              <ReservationForm
                destinationId={destination.id}
                availableFrom={
                  destination.availableFrom
                    ? destination.availableFrom.toISOString().slice(0, 10)
                    : null
                }
                availableTo={
                  destination.availableTo
                    ? destination.availableTo.toISOString().slice(0, 10)
                    : null
                }
              />
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem 5rem",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.72)",
            border: "1px solid rgba(31,26,23,0.08)",
            borderRadius: "30px",
            padding: "2rem",
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
            À propos du séjour
          </p>

          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              lineHeight: 1.1,
              marginBottom: "1rem",
              fontFamily:
                "'Playfair Display', Georgia, 'Times New Roman', serif",
              fontWeight: 600,
            }}
          >
            Une expérience pensée pour s’évader avec style.
          </h2>

          <p
            style={{
              color: "#5f544c",
              lineHeight: 1.9,
              fontSize: "1.04rem",
              maxWidth: "80ch",
              margin: 0,
            }}
          >
            {destination.description}
          </p>
        </div>
      </section>
    </main>
  );
}