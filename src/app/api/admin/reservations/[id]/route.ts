import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/admin";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminApi();

    const { id } = await params;
    const body = await req.json();

    const reservation = await prisma.reservation.update({
      where: { id },
      data: {
        status: body.status,
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error("RESERVATION PUT ERROR:", error);

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

    await prisma.reservation.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("RESERVATION DELETE ERROR:", error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}