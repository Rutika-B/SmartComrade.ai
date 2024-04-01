import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, instructions, seed, name, categoryId, description } = body;

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
    const comrade = await prismadb.comrade.create({
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
    console.log("[comrade_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
