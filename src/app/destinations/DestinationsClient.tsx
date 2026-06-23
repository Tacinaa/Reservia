"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Destination = {
  id: string;
  name: string;
  country: string;
  city: string | null;
  shortDesc: string;
  image: string;
  basePrice: number;
};

export default function DestinationsClient({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const countries = useMemo(
    () => [...new Set(destinations.map((d) => d.country))].sort(),
    [destinations]
  );

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const q = search.toLowerCase();
      const matchSearch =
        q === "" ||
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        (d.city ?? "").toLowerCase().includes(q);
      const matchCountry = country === "" || d.country === country;
      const matchPrice = maxPrice === "" || d.basePrice <= Number(maxPrice);
      return matchSearch && matchCountry && matchPrice;
    });
  }, [destinations, search, country, maxPrice]);

  const hasFilter = search !== "" || country !== "" || maxPrice !== "";

  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem 2rem 5rem",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.82)",
          border: "1px solid rgba(31,26,23,0.08)",
          borderRadius: "20px",
          padding: "1.2rem 1.4rem",
          marginBottom: "2rem",
          display: "flex",
          gap: "0.8rem",
          flexWrap: "wrap",
          alignItems: "center",
          boxShadow: "0 8px 20px rgba(68,49,33,0.05)",
        }}
      >
        <input
          type="text"
          placeholder="Rechercher une destination, un pays…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: "1 1 220px",
            height: "46px",
            borderRadius: "12px",
            border: "1px solid rgba(31,26,23,0.12)",
            padding: "0 1rem",
            background: "#fffdfb",
            color: "#1f1a17",
            fontSize: "0.95rem",
            outline: "none",
          }}
        />

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{
            flex: "1 1 160px",
            height: "46px",
            borderRadius: "12px",
            border: "1px solid rgba(31,26,23,0.12)",
            padding: "0 1rem",
            background: "#fffdfb",
            color: country ? "#1f1a17" : "#8a7d72",
            fontSize: "0.95rem",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="">Tous les pays</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Prix max (€)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          min={0}
          style={{
            flex: "1 1 130px",
            height: "46px",
            borderRadius: "12px",
            border: "1px solid rgba(31,26,23,0.12)",
            padding: "0 1rem",
            background: "#fffdfb",
            color: "#1f1a17",
            fontSize: "0.95rem",
            outline: "none",
          }}
        />

        {hasFilter && (
          <button
            onClick={() => {
              setSearch("");
              setCountry("");
              setMaxPrice("");
            }}
            style={{
              height: "46px",
              borderRadius: "999px",
              border: "1px solid rgba(31,26,23,0.12)",
              padding: "0 1.1rem",
              background: "#fff",
              color: "#5f544c",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.92rem",
            }}
          >
            Réinitialiser
          </button>
        )}
      </div>

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
        <div>
          <p style={{ color: "#8a7d72", marginBottom: "0.35rem", margin: "0 0 0.35rem 0" }}>
            {filtered.length} destination{filtered.length > 1 ? "s" : ""}{" "}
            {hasFilter ? "trouvée" : "disponible"}
            {filtered.length > 1 ? "s" : ""}
          </p>
          <h2
            style={{
              margin: 0,
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
          style={{ textDecoration: "none", color: "#1f6b6b", fontWeight: 600 }}
        >
          Retour à l'accueil
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div
          style={{
            background: "rgba(255,255,255,0.72)",
            border: "1px solid rgba(31,26,23,0.08)",
            borderRadius: "24px",
            padding: "2rem",
          }}
        >
          <p style={{ color: "#5f544c", margin: 0 }}>
            Aucune destination ne correspond à votre recherche.
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
          {filtered.map((destination) => (
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
                <Image
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
                        margin: "0 0 0.35rem 0",
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

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
  );
}
