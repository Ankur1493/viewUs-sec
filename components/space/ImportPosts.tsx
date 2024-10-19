import { Import } from "lucide-react";
import { ImportCardWrapper } from "./ImportCardWrapper";

const socialPlatforms = [
  {
    title: "Twitter",
    image: "/assets/images/twitter_logo.png",
    fetchLink: "import from twitter",
  },
  {
    title: "LinkedIn",
    image: "/assets/images/linkedIn_logo.png",
    fetchLink: "import from linkedIn",
  },
  {
    title: "Product Hunt",
    image: "/assets/images/ProductHunt_logo.png",
    fetchLink: "Import from Product Hunt",
  },
];

export const ImportPosts = () => {
  return (
    <div className="container mx-auto px-4 py-8 overflow-hidden">
      <div className="mb-8 px-6">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-2">
          <Import className="w-8 h-8" />
          Import Social Content
        </h2>
        <p className="text-gray-600 text-md">
          Import your posts from different platforms to streamline your content
          management.
        </p>
      </div>
      <div className="flex gap-6">
        {socialPlatforms.map((platform) => (
          <ImportCardWrapper
            key={platform.title}
            title={platform.title}
            image={platform.image}
            fetchLink={platform.fetchLink}
          />
        ))}
      </div>
    </div>
  );
};
