import { getSpaceDetails } from "@/data/space";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function ReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  //have added the slug, create a card component here which have text and video options along
  //use Link from next/Link to redirect user to the text or video review

  const reviewForm = await getSpaceDetails(params.slug);
  console.log(reviewForm);

  if (!reviewForm) {
    return <div>Can't found this space</div>;
  }

  return (
    <Card className="w-[450px] px-[2%]">
      <CardHeader>
        <div className="flex justify-center">
          <Image
            src={reviewForm.image!}
            alt="logo"
            height={80}
            width={80}
            className="rounded-full"
          />
        </div>

        <CardTitle className="text-center text-[#33313B]">
          {reviewForm.slug.toUpperCase()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-[#33313B] font-normal text-lg">
          {reviewForm.heading}
        </div>
        <div className="mt-3">
          <ul>
            {reviewForm.questions.map((q) => (
              <li key={q.id}>Q. {q.question} ?</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Link href={`/${reviewForm.slug}/textReview`} className="w-full">
          <Button className="w-full">Record a Video</Button>
        </Link>
        <Link href={`/${reviewForm.slug}/videoReview`} className="w-full">
          <Button className="w-full">Write a Testimonial</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
