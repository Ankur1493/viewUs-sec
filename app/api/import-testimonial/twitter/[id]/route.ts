import { createImportedReview } from '@/data/review'
import { NextResponse } from 'next/server'
import { getTweet } from 'react-tweet/api'
import { ImportedReviewType, ReviewType } from '@/models/review_model'

type RouteSegment = { params: { id: string } }

export async function POST(_: Request, { params }: RouteSegment) {
  try {
    const tweet = await getTweet(params.id)

    if (!tweet)
      return NextResponse.json({ success: "failed", data: null, message: "tweet not found" }, { status: 404 })
    const message = tweet.text;
    const firstName = tweet.user.name;
    const image = tweet.user.profile_image_url_https;
    let importedImages: string[] = []
    if (tweet.photos && tweet.photos?.length > 0) {
      importedImages = tweet.photos?.map(photo => photo.url);
    }

    console.log({ importedImages })
    const importedVideos: string[] = []
    if (tweet.video) {
      importedVideos.push(tweet.video.variants[tweet.video.variants.length - 1].src)
    }
    const review = await createImportedReview({
      spaceId: "cmdc",
      slug: "mckdmcd",
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
