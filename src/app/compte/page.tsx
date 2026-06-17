import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CancelReservationButton} from "@/components/CancelReservationButton";

export default async function ComptePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      reservations: {
        include: {
          destination: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    return (
      <main>
        <h1>Mon compte</h1>
        <p>Utilisateur introuvable.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Mon compte</h1>

      <p>Prénom : {user.firstName}</p>
      <p>Nom : {user.lastName}</p>
      <p>Email : {user.email}</p>
      <p>Rôle : {user.role}</p>

      <h2>Mes réservations</h2>

      {user.reservations.length === 0 ? (
        <p>Aucune réservation pour le moment.</p>
      ) : (
        <ul>
          {user.reservations.map((reservation) => (
            <li key={reservation.id}>
              <strong>{reservation.destination.name}</strong> —{" "}
              {new Date(reservation.travelDate).toLocaleDateString("fr-FR")} —{" "}
              {reservation.persons} personne(s) — {reservation.totalPrice} €
              <CancelReservationButton id={reservation.id} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}