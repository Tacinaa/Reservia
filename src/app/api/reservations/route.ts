import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: any;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON invalide" }, { status: 400 });
  }

  const { destinationId, travelDate, persons } = body;

  if (!destinationId || !travelDate || !persons) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const parsedPersons = Number(persons);

  if (Number.isNaN(parsedPersons) || parsedPersons <= 0) {
    return NextResponse.json({ error: "Nombre de personnes invalide" }, { status: 400 });
  }

  const destination = await prisma.destination.findUnique({
    where: { id: destinationId },
  });

  if (!destination) {
    return NextResponse.json({ error: "Destination introuvable" }, { status: 404 });
  }

  const selectedDate = new Date(travelDate);
  const selectedDateOnly = new Date(selectedDate.toISOString().slice(0, 10));

  const availableFrom = destination.availableFrom
    ? new Date(destination.availableFrom.toISOString().slice(0, 10))
    : null;

  const availableTo = destination.availableTo
    ? new Date(destination.availableTo.toISOString().slice(0, 10))
    : null;

  if (availableFrom && selectedDateOnly < availableFrom) {
    return NextResponse.json(
      { error: "La date choisie est avant la date de disponibilité." },
      { status: 400 }
    );
  }

  if (availableTo && selectedDateOnly > availableTo) {
    return NextResponse.json(
      { error: "La date choisie est après la date de disponibilité." },
      { status: 400 }
    );
  }

  const totalPrice = destination.basePrice * parsedPersons;

  const reservation = await prisma.reservation.create({
    data: {
      userId: session.user.id,
      destinationId: destination.id,
      travelDate: selectedDate,
      persons: parsedPersons,
      totalPrice,
      status: "CONFIRMED",
    },
  });

  return NextResponse.json(reservation, { status: 201 });
}