import Image from "next/image";
import { CheckCircle, Star } from "lucide-react";

export default function CollectPage() {
  return (
    <div className="min-h-screen w-full py-12 lg:px-56">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          How to Effectively Collect Testimonials
        </h1>

        <section className="my-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            <div className="w-fullS">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                The Significance of Testimonials
              </h2>
              <p className="text-gray-600 mb-4">
                Before collecting testimonials, it is crucial to understand
                their significance for your business and product. Testimonials
                are powerful tools that are more than just positive comments:
              </p>
              <ul className="space-y-2">
                {[
                  "Gain the trust of your customers – Potential customers are more likely to trust real reviews over direct market messaging.",
                  "Drive more traffic to your site – Genuine reviews attract customers to spend more time on your site and see your offerings, thus boosting up your sales.",
                  "Convert active users to paying clients – Testimonials act as a bridge between free customers and paid clients. They are considered as social proof, helping to persuade users to the next step in their journey with your product.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Collect Testimonials in Easy Steps
          </h2>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow-md">
              <div className="w-full md:w-1/3">
                <Image
                  src="/assets/images/viewus-prod-video/3_steps/2step/1-cover.png"
                  alt="Create a space for testimonials"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-semibold mb-2">
                  1. Create a Space
                </h3>
                <p className="text-gray-600">
                  Before creating a space, verify your account to ensure
                  authenticity. Once verified, create your space and customize
                  review forms to match your branding. Decide on the type of
                  data and testimonials you prefer, such as text or video.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow-md">
              <div className="w-full md:w-1/3">
                <Image
                  src="/assets/images/viewus-prod-video/3_steps/3step/2-review.png"
                  alt="Share your review forms"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-semibold mb-2">
                  2. Share Your Review Forms
                </h3>
                <p className="text-gray-600">
                  Share the review form link provided by ViewUs with your
                  customers via email or messaging platforms. You can also
                  import customer reviews from social media platforms like
                  Twitter, ProductHunt, and LinkedIn.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 mt-20">
            Modifying Your Review Form
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-lg ">
              <h3 className="text-xl font-semibold mb-2">
                1. Customize Review Form Design
              </h3>
              <p className="text-gray-600">
                Personalize the logo, headings, and subheadings to reflect your
                brand&apos;s identity. Select from different themes and colors
                for your review forms.
              </p>
            </div>

            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                2. Customer Details
              </h3>
              <p className="text-gray-600">
                Collect customer and company details to increase authenticity
                and improve searchability of testimonials. Set which details are
                required or optional.
              </p>
              <ul className="mt-2 space-y-1 text-gray-600 grid grid-cols-2">
                {[
                  "User image",
                  "First name",
                  "Last name",
                  "Email",
                  "Job title",
                  "Company name",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                3. Preferred Review: Text/Video
              </h3>
              <p className="text-gray-600">
                Allow customers to provide reviews in either text or video
                format. Set a default option based on your preferences. Include
                star ratings and predefined tags for customers to select during
                the review process.
              </p>
            </div>

            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">4. Questions</h3>
              <p className="text-gray-600">
                Craft well-designed questions to improve the quality of
                testimonials. You have full control to define questions based on
                your product&apos;s needs and focus, ensuring relevant and
                impactful testimonials.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
