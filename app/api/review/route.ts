import { connectToMongo } from "@/lib/mongoose";
import Review from "@/models/review_model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  await connectToMongo();

  const reviews = await Review.find({ slug, liked: true }).sort({
    updatedAt: -1,
  });
  console.log(slug);
  return NextResponse.json(reviews);
}
