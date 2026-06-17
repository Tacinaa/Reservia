import Link from "next/link";
import { ReactNode } from "react";
import { requireAdmin } from "@/lib/admin";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();

  const navLinkStyle = {
    display: "block",
    padding: "0.9rem 1rem",
    borderRadius: "14px",
    textDecoration: "none",
    color: "#f6f1eb",
    background: "rgba(255,255,255,0.06)",
    fontWeight: 600,
  } as const;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f1eb",
        color: "#1f1a17",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px minmax(0, 1fr)",
          minHeight: "100vh",
        }}
      >
        <aside
          style={{
            background: "#1f1a17",
            color: "#f6f1eb",
            padding: "1.5rem",
            display: "grid",
            alignContent: "start",
            gap: "1rem",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                fontSize: "0.74rem",
                color: "#b6a89e",
                marginBottom: "0.6rem",
              }}
            >
              Administration
            </p>
            <h1
              style={{
                margin: 0,
                fontSize: "1.8rem",
                lineHeight: 1.1,
                fontFamily:
                  "'Playfair Display', Georgia, 'Times New Roman', serif",
              }}
            >
              Travel Admin
            </h1>
          </div>

          <nav style={{ display: "grid", gap: "0.75rem" }}>
            <Link href="/admin" style={navLinkStyle}>
              Dashboard
            </Link>
            <Link href="/admin/destinations" style={navLinkStyle}>
              Destinations
            </Link>
            <Link href="/admin/reservations" style={navLinkStyle}>
              Réservations
            </Link>
            <Link href="/admin/users" style={navLinkStyle}>
              Utilisateurs
            </Link>
            <Link href="/" style={navLinkStyle}>
              Retour au site
            </Link>
          </nav>
        </aside>

        <main style={{ padding: "2rem" }}>{children}</main>
      </div>
    </div>
  );
}