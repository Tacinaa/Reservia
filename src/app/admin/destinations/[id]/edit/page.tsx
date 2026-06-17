import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EditDestinationForm } from "@/components/EditDestinationForm";

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/compte");
  }

  const { id } = await params;

  const destination = await prisma.destination.findUnique({
    where: { id },
  });

  if (!destination) {
    return (
      <main>
        <h1>Destination introuvable</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>Modifier la destination</h1>
      <EditDestinationForm
        destination={{
          id: destination.id,
          name: destination.name,
          country: destination.country,
          city: destination.city,
          shortDesc: destination.shortDesc,
          description: destination.description,
          image: destination.image,
          gallery: destination.gallery,
          basePrice: destination.basePrice,
          availableFrom: destination.availableFrom
            ? destination.availableFrom.toISOString().slice(0, 10)
            : null,
          availableTo: destination.availableTo
            ? destination.availableTo.toISOString().slice(0, 10)
            : null,
        }}
      />
    </main>
  );
}