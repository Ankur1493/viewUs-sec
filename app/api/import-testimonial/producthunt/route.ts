import { createImportedReview } from '@/data/review';
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { db } from '@/lib/db';
import { ImportedReviewType, ReviewType } from '@/models/review_model';

// Define the POST req handler
export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    // Check if the URL is provided
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }


    const spaceSlug = req.url.split("/")[2]

    const spaceExists = await db.space.findUnique({
      where: {
        slug: spaceSlug
      }
    })

    if (!spaceExists)
      return NextResponse.json({ success: "failed", data: null, message: "unable to find your space, try using our platform to import" }, { status: 404 })


    // Launch Puppeteer browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Execute the script on the page to extract comment data
    const result = await page.evaluate(() => {
      const commentId = location.search.split('comment=')[1];
      const commentElement = document.getElementById(`comment-${commentId}`);

      if (!commentElement) {
        return { error: 'Comment not found' };
      }


      //@ts-ignore
      const commentBody = commentElement.querySelector('.styles_htmlText__eYPgj')?.innerText || 'No comment body found';
      //@ts-ignore
      const authorName = commentElement.querySelector('.text-14.font-semibold.text-dark-gray')?.innerText || 'No author name found';
      //@ts-ignore
      const profileImage = commentElement.querySelector('img[loading="lazy"]')?.src || 'No image found';

      return { commentBody, authorName, profileImage };
    });
    await browser.close();

    // Handle the result
    if (result.error) {
      return NextResponse.json(result, { status: 404 });
    }

    const reviewCreated = await createImportedReview({
      spaceId: spaceExists.id,
      reviewType: ReviewType.IMPORTED,
      importedReviewType: ImportedReviewType.PRODUCTHUNT,
      slug: spaceExists.slug,
      review: result.commentBody as string,
      firstName: result.authorName as string,
      image: result.profileImage as string,
    })

    if (reviewCreated) {
      return NextResponse.json({ data: reviewCreated ?? null }, { status: tweet ? 200 : 404 })
    }
  } catch (error) {
    console.error('Error fetching details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch details. Check the server logs.' },
      { status: 500 }
    );
  }
}

