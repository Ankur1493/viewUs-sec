"use client";

import { WallCardTypesConstants } from "@/constants";
import { WallCardTypes } from "./WallCardTypes";
import { useWallTypeStore } from "@/store/useWallTypeStore";
import { EditWallOfLove } from "./EditWallOfLove";
import { useEffect, useState } from "react";
import { FinalWallOfLoveCodeCopy } from "./FinalWallOfLoveCodeCopy";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { MoveLeft } from "lucide-react";

interface WallOfLoveProps {
  slug: string;
}

export const WallOfLove = ({ slug }: WallOfLoveProps) => {
  const [loading, setLoading] = useState(true);
  const { url, setUrl, page, initializepage } = useWallTypeStore();
  const router = useRouter();

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      initializepage();
      setLoading(false);
    };
    loadPage();
  }, [initializepage]);

  useEffect(() => {
    if (url) {
      const testUrl = new URL(url!);
      testUrl.searchParams.set(`slug`, slug);
      setUrl(testUrl.toString());
    }
  }, [url, setUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {page === "all" && (
        <>
          <Button
            onClick={() => router.push(`/space/${slug}`)}
            className="fixed top-3 left-2 bg-white text-black hover:bg-white flex-1 flex gap-2 border-none shadow-none z-10"
          >
            <MoveLeft size={20} />
            Back
          </Button>
          <div className="flex flex-col gap-8 px-2 md:px-4 lg:px-16 py-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-black text-">
              What kind of wall do you want to cook today??
            </h1>
            <div className="w-full lg:pr-6 grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-16">
              {WallCardTypesConstants.map((card, index) => (
                <WallCardTypes
                  index={index}
                  key={card.key}
                  title={card.title}
                  desc={card.desc}
                  img={card.img}
                  slug={card.slug}
                  url={card.url!}
                  info={card.info}
                />
              ))}
            </div>
          </div>
        </>
      )}
      {page === "editing" && (
        <div className="overflow-y-hidden">
          <EditWallOfLove />
        </div>
      )}
      {page === "final" && (
        <div>
          <FinalWallOfLoveCodeCopy slug={slug} />
        </div>
      )}
    </div>
  );
};
