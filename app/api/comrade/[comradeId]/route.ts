import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { comradeId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, instructions, seed, name, categoryId, description } = body;

    if (!params.comradeId) {
      return new NextResponse("comrade Id is required", { status: 400 });
    }
    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!src || !name || !seed || !instructions || !categoryId) {
      return new NextResponse("Missing required Field", { status: 400 });
    }

    const isPro = await checkSubscription();

    if (!isPro) {
      return new NextResponse("pro subscription required", { status: 403 });
    }
    const comrade = await prismadb.comrade.update({
      where: {
        id: params.comradeId,
        userId: user.id,
      },
      data: {
        categoryId,
        userId: user.id,
        username: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });
    return NextResponse.json(comrade);
  } catch (error) {
    console.log("[comrade_PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { comradeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const comrade = await prismadb.comrade.delete({
      where: {
        userId,
        id: params.comradeId,
      },
    });
    return NextResponse.json(comrade);
  } catch (error) {
    console.log("[comrade_PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
