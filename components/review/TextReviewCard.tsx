import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useReviewPageStore from "@/store/useReviewPageStore";
import { Video } from "lucide-react";
import { TagSelection } from "./TagSelection";
import { Starred } from "./Starred";
import { ReviewForm } from "@/types";
import { Questions } from "./Questions";

export const TextReviewCard = ({ reviewForm }: { reviewForm: ReviewForm }) => {
  //zustand state variables are called
  const {
    detailsButton,
    setDetailsButton,
    textReview,
    setTextReview,
    setReviewButton,
    submitButton,
    setSubmitButton,
    customerDetails,
    starred,
    selectedTags,
  } = useReviewPageStore();

  const handleSubmitReview = async () => {
    try {
      const formData = new FormData();

      formData.append("firstName", customerDetails.firstName);
      formData.append("lastName", customerDetails.lastName);
      formData.append("email", customerDetails.email);
      formData.append(
        "spaceId",
        reviewForm.details ? reviewForm.details.spaceId : ""
      );
      if (customerDetails.company)
        formData.append("company", customerDetails?.company);
      if (customerDetails.jobTitle)
        formData.append("jobTitle", customerDetails?.jobTitle);

      formData.append("review", textReview);
      formData.append("stars", starred.toString());
      selectedTags.forEach((tag) => formData.append("tags[]", tag)); // Append each tag individually as an array

      if (customerDetails.image) {
        formData.append("image", customerDetails.image);
      }

      const response = await axios.post("/api/review/text", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success (e.g., show a success message or navigate)
      console.log("Review submitted successfully", response.data);

      setSubmitButton(!submitButton);
    } catch (err) {
      console.error("Error submitting review", err);
    }
  };

  const isValid = textReview.trim().length >= 30 && starred > 0;

  return (
    <Card className="relative w-full lg:w-[85%] h-full px-[2%] border-none shadow-none flex flex-col">
      {/* <div className="flex flex-col">
        <CardHeader className="flex flex-row gap-3">
          <div className="flex">
            <Image
              src={
                reviewForm.details
                  ? reviewForm.details.coverPageImageUrl !== null
                    ? reviewForm.details.coverPageImageUrl
                    : "https://ui.aceternity.com/_next/image?url=%2Flogo-dark.png&w=64&q=75"
                  : "https://ui.aceternity.com/_next/image?url=%2Flogo-dark.png&w=64&q=75"
              }
              alt="logo"
              height={50}
              width={50}
              className="rounded-full"
            />
          </div>
        </CardHeader>
      </div> */}
      <div className="flex flex-col gap-12 md:gap-0 md:flex-row mt-24 px-[2%]">
        <div className="flex flex-col gap-2 basis-8/12">
          <div>
            <div className="text-[#33313B] font-[500] text-3xl md:text-[36px]">
              {reviewForm.details
                ? reviewForm.details.testimonialPageTitle
                : ""}
            </div>
            {/* <div className="text-[#222222] font-[400] text-[16px]">
              {reviewForm.details
                ? reviewForm.details.testimonialPageDescription
                : "Thanks for taking out some time to fill a review for us, cheers!"}
            </div> */}
            <div className="mt-6">
              <Starred />
            </div>
          </div>
          <CardContent className="px-0 pb-1 w-full md:w-[90%] lg:w-[85%]">
            <div>
              <textarea
                name="textReview"
                id="text"
                className="w-full border border-gray-400 rounded-lg h-64 p-3 text-sm md:text-base"
                placeholder="What did you use our product for? What did you like about your experience?"
                value={textReview}
                onChange={(e) => setTextReview(e.target.value)}
                maxLength={500}
              ></textarea>
              <div className="text-left text-sm text-gray-800">
                {500 - textReview.length} / 500 characters left
              </div>
              {textReview.trim().length < 30 ? (
                <div className="text-left text-xs text-red-500">
                  Please write at least 30 characters.
                </div>
              ) : null}
            </div>
          </CardContent>
          <TagSelection reviewForm={reviewForm} />
        </div>
        <div className="w-full md:basis-2/6 flex flex-col gap-6 lg:pr-12 pb-12 md:pb-0">
          <Card className="hidden w-full md:flex flex-col items-center">
            <CardHeader className="flex flex-col justify-center items-center gap-3">
              <div className="flex justify-center items-center w-[80px] h-[80px] bg-[#E9F8FF] rounded-full">
                <Video color="#009EE2" size={32} />
              </div>

              <CardTitle className="text-center text-[#33313B] text-[16px] font-normal flex items-center tracking-[2%]">
                Or record a two minute video
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-col">
              <Button
                className="border-[#71D4FF] text-black border-2 rounded-3xl text-[14px] px-[24px]"
                variant="outline"
                onClick={() => {
                  setReviewButton("Video");
                }}
              >
                Record Video Testimonial
              </Button>
            </CardFooter>
          </Card>
          <Questions reviewForm={reviewForm} />
          <div className="md:hidden">
            <Button
              className="w-full border-[#71D4FF] text-black border-2 rounded-3xl text-[14px] px-[24px]"
              variant="outline"
              onClick={() => {
                setReviewButton("Video");
              }}
            >
              Or record Video Testimonial
            </Button>
          </div>
          <div className="flex justify-between">
            <Button
              variant="link"
              className="text-black text-[14px] px-0 hover:text-gray-800"
              onClick={() => {
                setReviewButton("");
                {
                  reviewForm.details
                    ? reviewForm.details.testimonialTextType
                      ? setDetailsButton(!detailsButton)
                      : setReviewButton("Video")
                    : setReviewButton("Video");
                }
              }}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="form"
              disabled={!isValid}
              className="text-[14px] p-0 py-2 px-4"
              onClick={handleSubmitReview}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
