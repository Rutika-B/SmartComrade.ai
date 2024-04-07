import { auth } from "@clerk/nextjs";
import {  NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { url } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!url) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const response = await cloudinary.uploader.upload(url, {
      upload_preset: "AI-GENERATED-images",
      folder: "ai-images",
      responsive_breakpoints: {
        create_derived: true,
        bytes_step: 20000,
        min_width: 200,
        max_width: 1000,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log("[IMAGE_UPLOAD_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
