import Link from "next/link";

type NavbarProps = {
  session: {
    user?: {
      name?: string | null;
      email?: string | null;
      role?: string | null;
    };
  } | null;
};

export default function Navbar({ session }: NavbarProps) {
  const isLoggedIn = !!session?.user;
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(18px)",
        background: "rgba(246, 241, 235, 0.78)",
        borderBottom: "1px solid rgba(31,26,23,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "#1f1a17",
            display: "flex",
            flexDirection: "column",
            lineHeight: 1,
          }}
        >
          <span
            style={{
              fontFamily:
                "'Playfair Display', Georgia, 'Times New Roman', serif",
              fontSize: "1.55rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Reservia
          </span>
          <span
            style={{
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#8a7d72",
              marginTop: "0.35rem",
            }}
          >
            Travel collection
          </span>
        </Link>

        <nav
          aria-label="Navigation principale"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#5f544c",
              fontWeight: 500,
            }}
          >
            Accueil
          </Link>

          <Link
            href="/destinations"
            style={{
              textDecoration: "none",
              color: "#5f544c",
              fontWeight: 500,
            }}
          >
            Destinations
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href="/reservations"
                style={{
                  textDecoration: "none",
                  color: "#5f544c",
                  fontWeight: 500,
                }}
              >
                Mes réservations
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  style={{
                    textDecoration: "none",
                    color: "#5f544c",
                    fontWeight: 500,
                  }}
                >
                  Admin
                </Link>
              )}

              <form action="/api/auth/signout" method="POST" style={{ margin: 0 }}>
                <button
                  type="submit"
                  style={{
                    textDecoration: "none",
                    background: "#1f1a17",
                    color: "#ffffff",
                    padding: "0.78rem 1.1rem",
                    borderRadius: "999px",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Déconnexion
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                style={{
                  textDecoration: "none",
                  color: "#5f544c",
                  fontWeight: 500,
                }}
              >
                Connexion
              </Link>

              <Link
                href="/register"
                style={{
                  textDecoration: "none",
                  background: "#1f6b6b",
                  color: "#ffffff",
                  padding: "0.78rem 1.1rem",
                  borderRadius: "999px",
                  fontWeight: 600,
                  boxShadow: "0 10px 24px rgba(31,107,107,0.16)",
                }}
              >
                Commencer
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}