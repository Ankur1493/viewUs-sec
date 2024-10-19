import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { db } from '@/lib/db';
import { createImportedReview } from '@/data/review';
import { ImportedReviewType, ReviewType } from '@/models/review_model';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    const { url } = await req.json();
    if (!url)
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });

    const reqUrl = req.headers.get('referer') || 'No referrer found';
    const spaceSlug = reqUrl.split("/space/")[1]

    const spaceExists = await db.space.findUnique({
      where: {
        slug: spaceSlug
      }
    })

    if (!spaceExists)
      return NextResponse.json({ success: "failed", data: null, message: "unable to find your space, try using our platform to import" }, { status: 404 })


    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2" });

    await page.waitForSelector('meta[property="og:title"]', { timeout: 10000 });

    const title = await page.$eval('meta[property="og:title"]', (el) => el.content) || "Unknown User";
    const username = title.match(/^(.*?)(?= on LinkedIn:)/)?.[0].trim() || "Unknown User";

    const profilePic = await page.evaluate(() => {
      const img = Array.from(document.querySelectorAll("img")).find((img) =>
        img.src.includes("profile-displayphoto-shrink")
      );
      if (img) return img.src;

      const companyLogo = Array.from(document.querySelectorAll("img")).find(
        (img) => img.src.includes("company-logo")
      );
      return companyLogo ? companyLogo.src : "";
    });

    const postImage = await page.$eval('meta[property="og:image"]', (el) => el.content) || "";
    const content = await page.evaluate(() => {
      const commentaryDiv = document.querySelector(".break-words");
      if (!commentaryDiv) return "No content available";
      //@ts-ignore
      return commentaryDiv.innerText.trim(" ");
    });

    const videoUrl = await page.evaluate(() => {
      const videoElement = document.querySelector("video");
      return videoElement ? videoElement.src : "";
    });

    // Close the browser
    await browser.close();


    const reviewCreated = await createImportedReview({
      spaceId: spaceExists.id,
      slug: spaceExists.slug,
      review: content,
      firstName: username,
      image: profilePic,
      reviewType: ReviewType.IMPORTED,
      importedReviewType: ImportedReviewType.LINKEDIN,
      importedImage: [postImage],
      importedVideo: [videoUrl]
    })

    if (reviewCreated) {
      return NextResponse.json({ data: reviewCreated ?? null }, { status: reviewCreated ? 200 : 404 })
    }

  } catch (error) {
    console.error("Error fetching LinkedIn details:", error);
    return NextResponse.json(
      { error: "Failed to fetch LinkedIn post details" },
      { status: 500 }
    );
  }
}
