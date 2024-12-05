import { Import } from "lucide-react";
import { ImportCardWrapper } from "@/components/space/imports/ImportCardWrapper";
import { ModalProvider } from "@/components/ui/animated-modal";

export enum SocialPlatformsType {
  TWITTER = "twitter",
  LINKEDIN = "linkedin",
  PRODUCTHUNT = "producthunt",
}

const socialPlatforms = [
  {
    title: "Twitter",
    slug: SocialPlatformsType.TWITTER,
    placeholder: "https://x.com/your-post",
    image: "/assets/images/twitter_logo.png",
  },
  {
    title: "LinkedIn",
    slug: SocialPlatformsType.LINKEDIN,
    placeholder: "https://linkedin.com/your-post",
    image: "/assets/images/linkedIn_logo.png",
  },
  {
    title: "Product Hunt",
    slug: SocialPlatformsType.PRODUCTHUNT,
    placeholder: "https://producthunt.com/user-comment",
    image: "/assets/images/ProductHunt_logo.png",
  },
];

export const ImportPosts = () => {
  return (
    <div className="mx-auto px-4 py-8 overflow-hidden">
      <div className="mb-8 pt-6  px-6">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-2">
          <Import className="w-8 h-8" />
          Import Testimonials
        </h2>
        <p className="text-gray-600 text-md">
          Import your posts from different platforms to streamline your content
          management.
        </p>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap flex-stretch gap-6">
        <ModalProvider>
          {socialPlatforms.map((platform) => (
            <ImportCardWrapper
              key={platform.title}
              title={platform.title}
              slug={platform.slug}
              image={platform.image}
              placeholder={platform.placeholder}
            />
          ))}
        </ModalProvider>
      </div>
    </div>
  );
};
