import Image from "next/image";
import { prisma } from "@/lib/prisma";
import DestinationsClient from "./DestinationsClient";

export const revalidate = 60;

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      country: true,
      city: true,
      shortDesc: true,
      image: true,
      basePrice: true,
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
              ambiances et trouvez l'escapade idéale selon vos envies.
            </p>
          </div>

          <Image
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80"
            alt="Destination élégante"
            width={1400}
            height={900}
            priority
            style={{
              width: "100%",
              height: "420px",
              objectFit: "cover",
              borderRadius: "28px",
              boxShadow: "0 28px 60px rgba(68, 49, 33, 0.16)",
            }}
          />
        </div>
      </section>

      <DestinationsClient destinations={destinations} />
    </main>
  );
}
