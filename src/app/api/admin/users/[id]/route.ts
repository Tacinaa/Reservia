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

    if (!["USER", "ADMIN"].includes(body.role)) {
      return NextResponse.json(
        { message: "Rôle invalide." },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        role: body.role,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("USER PUT ERROR:", error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}