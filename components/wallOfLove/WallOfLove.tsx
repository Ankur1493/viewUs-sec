"use client";

import { WallCardTypesConstants } from "@/constants";
import { WallCardTypes } from "./WallCardTypes";
import { useWallTypeStore } from "@/store/useWallTypeStore";
import { EditWallOfLove } from "./EditWallOfLove";
import { useEffect, useState } from "react";
import { FinalWallOfLoveCodeCopy } from "./FinalWallOfLoveCodeCopy";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface WallOfLoveProps {
  slug: string;
}

export const WallOfLove = ({ slug }: WallOfLoveProps) => {
  const [loading, setLoading] = useState(true);
  const { page, initializepage } = useWallTypeStore();
  const router = useRouter();

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      initializepage();
      setLoading(false);
    };
    loadPage();
  }, [initializepage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {page === "all" && (
        <>
          <Button
            onClick={() => router.push(`/space/${slug}`)}
            className="fixed top-2 left-2 bg-white text-black hover:bg-gray-100 flex-1 flex gap-2 border shadow-sm px-6"
          >
            <ArrowLeftIcon size={25} />
          </Button>
          <div className="flex flex-col gap-8 px-40 pb-12">
            <h1 className="text-4xl font-semibold">
              What kind of wall do you want to cook today??
            </h1>
            <div className="w-full pr-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {WallCardTypesConstants.map((card, index) => (
                <WallCardTypes
                  index={index}
                  key={card.key}
                  title={card.title}
                  desc={card.desc}
                  img={card.img}
                  slug={card.slug}
                  url={card.url!}
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
