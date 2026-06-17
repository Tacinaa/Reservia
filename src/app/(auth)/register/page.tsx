import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
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
            Nouveau compte
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
            Commencez à organiser vos prochains séjours.
          </h1>

          <p
            style={{
              color: "#5f544c",
              lineHeight: 1.85,
              maxWidth: "52ch",
              fontSize: "1.02rem",
            }}
          >
            Créez votre espace personnel pour enregistrer vos réservations,
            explorer les destinations et préparer vos voyages dans un cadre simple
            et premium.
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
            Inscription
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
            Créer votre compte
          </h2>

          <p
            style={{
              margin: "0 0 1.6rem 0",
              color: "#6b5f56",
              lineHeight: 1.7,
            }}
          >
            Quelques informations suffisent pour commencer.
          </p>

          <RegisterForm />

          <p
            style={{
              marginTop: "1.4rem",
              color: "#6b5f56",
              lineHeight: 1.7,
              fontSize: "0.96rem",
            }}
          >
            Vous avez déjà un compte ?{" "}
            <Link
              href="/login"
              style={{
                color: "#1f6b6b",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Se connecter
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}