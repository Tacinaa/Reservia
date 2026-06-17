import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(destinations);
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la récupération des destinations" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const destination = await prisma.destination.create({
      data: {
        name: body.name,
        country: body.country,
        city: body.city,
        shortDesc: body.shortDesc,
        description: body.description,
        image: body.image,
        gallery: body.gallery || [],
        basePrice: Number(body.basePrice),
        availableFrom: body.availableFrom ? new Date(body.availableFrom) : null,
        availableTo: body.availableTo ? new Date(body.availableTo) : null,
      },
    });

    return NextResponse.json(destination, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la création de la destination" },
      { status: 500 }
    );
  }
}