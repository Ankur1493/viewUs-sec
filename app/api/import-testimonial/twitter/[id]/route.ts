import { createImportedReview } from '@/data/review'
import { NextResponse } from 'next/server'
import { getTweet } from 'react-tweet/api'
import { ImportedReviewType, ReviewType } from '@/models/review_model'
import { db } from '@/lib/db'

type RouteSegment = { params: { id: string } }

export async function POST(req: Request, { params }: RouteSegment) {
  try {
    const tweet = await getTweet(params.id)
    const spaceSlug = req.url.split("/")[2]

    const spaceExists = await db.space.findUnique({
      where: {
        slug: spaceSlug
      }
    })

    if (!spaceExists)
      return NextResponse.json({ success: "failed", data: null, message: "unable to find your space, try using our platform to import" }, { status: 404 })

    if (!tweet)
      return NextResponse.json({ success: "failed", data: null, message: "tweet not found" }, { status: 404 })
    const message = tweet.text;
    const firstName = tweet.user.name;
    const image = tweet.user.profile_image_url_https;
    let importedImages: string[] = []
    if (tweet.photos && tweet.photos?.length > 0) {
      importedImages = tweet.photos?.map(photo => photo.url);
    }

    const importedVideos: string[] = []
    if (tweet.video) {
      importedVideos.push(tweet.video.variants[tweet.video.variants.length - 1].src)
    }
    //@ts-ignore
    const review = await createImportedReview({
      spaceId: spaceExists.id,
      slug: spaceExists.slug,
      review: message,
      firstName,
      image,
      reviewType: ReviewType.IMPORTED,
      importedReviewType: ImportedReviewType.TWITTER,
      importedImage: importedImages,
      importedVideo: importedVideos
    })
    if (review) {
      return NextResponse.json({ data: tweet ?? null }, { status: tweet ? 200 : 404 })
    }
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { success: "failed", message: error.message ?? 'Bad request.' },
      { status: 400 }
    )
  }
}
