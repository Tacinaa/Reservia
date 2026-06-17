import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { CreateDestinationForm } from "@/components/CreateDestinationForm";

export default async function NewDestinationPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/compte");
  }

  return (
    <main>
      <h1>Ajouter une destination</h1>
      <CreateDestinationForm />
    </main>
  );
}