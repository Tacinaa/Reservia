import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

function toDate(value?: string | null) {
  if (!value) return null;
  return new Date(value);
}

export async function POST(req: Request) {
  await requireAdmin();

  try {
    const body = await req.json();

    const {
      name,
      country,
      city,
      shortDesc,
      description,
      image,
      gallery,
      basePrice,
      availableFrom,
      availableTo,
    } = body;

    if (
      !name ||
      !country ||
      !shortDesc ||
      !description ||
      !image ||
      basePrice === undefined
    ) {
      return NextResponse.json(
        { message: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }

    const destination = await prisma.destination.create({
      data: {
        name,
        country,
        city: city || null,
        shortDesc,
        description,
        image,
        gallery: Array.isArray(gallery) ? gallery : [],
        basePrice: Number(basePrice),
        availableFrom: toDate(availableFrom),
        availableTo: toDate(availableTo),
      },
    });

    return NextResponse.json(destination, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur serveur lors de la création." },
      { status: 500 }
    );
  }
}