import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: any;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON invalide" }, { status: 400 });
  }

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
    basePrice === undefined ||
    basePrice === null ||
    basePrice === ""
  ) {
    return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
  }

  const parsedBasePrice = Number(basePrice);

  if (Number.isNaN(parsedBasePrice) || parsedBasePrice < 0) {
    return NextResponse.json({ error: "basePrice invalide" }, { status: 400 });
  }

  const parsedGallery = Array.isArray(gallery)
    ? gallery.filter((item) => typeof item === "string" && item.trim() !== "")
    : [];

  const destination = await prisma.destination.create({
    data: {
      name: String(name).trim(),
      country: String(country).trim(),
      city: city ? String(city).trim() : null,
      shortDesc: String(shortDesc).trim(),
      description: String(description).trim(),
      image: String(image).trim(),
      gallery: parsedGallery,
      basePrice: parsedBasePrice,
      availableFrom: availableFrom ? new Date(availableFrom) : null,
      availableTo: availableTo ? new Date(availableTo) : null,
    },
  });

  return NextResponse.json(destination, { status: 201 });
}