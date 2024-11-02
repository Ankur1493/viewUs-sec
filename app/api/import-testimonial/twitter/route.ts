import { createImportedReview } from '@/data/review'
import { NextResponse } from 'next/server'
import { getTweet } from 'react-tweet/api'
import { ImportedReviewType, ReviewType } from '@/models/review_model'
import { db } from '@/lib/db'
import { auth } from '@/auth'


export async function POST(req: Request) {
  try {

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    const { url } = await req.json()
    if (!url)
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });

    const statusId = url.split("/status/")[1];
    const tweet = await getTweet(statusId)
    const reqUrl = req.headers.get('referer') || 'No referrer found';
    const spaceSlug = reqUrl.split("/space/")[1]

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

    const review = await createImportedReview({
      spaceId: spaceExists.id,
      slug: spaceExists.slug,
      review: message,
      liked: false,
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
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: "failed", message: 'Failed to import your tweet, try again later' },
      { status: 400 }
    )
  }
}
