import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/admin";

function toDate(value?: string | null) {
  if (!value) return null;
  return new Date(value);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminApi();

    const { id } = await params;
    const body = await req.json();

    const destination = await prisma.destination.update({
      where: { id },
      data: {
        name: body.name,
        country: body.country,
        city: body.city || null,
        shortDesc: body.shortDesc,
        description: body.description,
        image: body.image,
        gallery: Array.isArray(body.gallery) ? body.gallery : [],
        basePrice: Number(body.basePrice),
        availableFrom: toDate(body.availableFrom),
        availableTo: toDate(body.availableTo),
      },
    });

    return NextResponse.json(destination);
  } catch (error) {
    console.error("DESTINATION PUT ERROR:", error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminApi();

    const { id } = await params;

    await prisma.destination.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DESTINATION DELETE ERROR:", error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}