import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function ComptePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Mon compte</h1>

      <p>
        <strong>Prénom :</strong> {session.user?.firstName || "Non renseigné"}
      </p>
      <p>
        <strong>Nom :</strong> {session.user?.lastName || "Non renseigné"}
      </p>
      <p>
        <strong>Email :</strong> {session.user?.email}
      </p>
      <p>
        <strong>Rôle :</strong> {session.user?.role || "USER"}
      </p>

      <h2 style={{ marginTop: "2rem" }}>Mes réservations</h2>
      <p>Aucune réservation pour le moment.</p>
    </main>
  );
}