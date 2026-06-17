import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/reservations");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f6f1eb 0%, #efe6dc 100%)",
        color: "#1f1a17",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
            Espace membre
          </p>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.8rem)",
              lineHeight: 1.02,
              marginBottom: "1rem",
              fontFamily:
                "'Playfair Display', Georgia, 'Times New Roman', serif",
              fontWeight: 600,
              maxWidth: "10ch",
            }}
          >
            Retrouvez vos voyages en toute simplicité.
          </h1>

          <p
            style={{
              color: "#5f544c",
              lineHeight: 1.85,
              maxWidth: "52ch",
              fontSize: "1.02rem",
            }}
          >
            Connectez-vous pour accéder à vos réservations, retrouver vos séjours
            et poursuivre votre expérience dans un espace personnel clair et apaisé.
          </p>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.82)",
            border: "1px solid rgba(31,26,23,0.08)",
            borderRadius: "30px",
            padding: "2rem",
            boxShadow: "0 20px 50px rgba(68,49,33,0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              fontSize: "0.74rem",
              color: "#8a7d72",
              marginBottom: "0.7rem",
            }}
          >
            Connexion
          </p>

          <h2
            style={{
              margin: "0 0 0.6rem 0",
              fontSize: "1.8rem",
              fontFamily:
                "'Playfair Display', Georgia, 'Times New Roman', serif",
              fontWeight: 600,
            }}
          >
            Bon retour parmi nous
          </h2>

          <p
            style={{
              margin: "0 0 1.6rem 0",
              color: "#6b5f56",
              lineHeight: 1.7,
            }}
          >
            Entrez vos identifiants pour accéder à votre compte.
          </p>

          <LoginForm />

          <p
            style={{
              marginTop: "1.4rem",
              color: "#6b5f56",
              lineHeight: 1.7,
              fontSize: "0.96rem",
            }}
          >
            Vous n’avez pas encore de compte ?{" "}
            <Link
              href="/register"
              style={{
                color: "#1f6b6b",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}