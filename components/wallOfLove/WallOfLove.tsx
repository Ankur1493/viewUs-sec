"use client";

import { WallCardTypesConstants } from "@/constants";
import { WallCardTypes } from "./WallCardTypes";
import { useWallTypeStore } from "@/store/useWallTypeStore";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { EditWallOfLove } from "./EditWallOfLove";
import { useEffect, useState } from "react";

export const WallOfLove = () => {
  const [loading, setLoading] = useState(true);
  const { page, data, setPage, initializepage } = useWallTypeStore();

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      initializepage(); // Ensure initializepage completes before setting loading to false
      setLoading(false);
    };
    loadPage();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while loading is true
  }

  return (
    <div>
      {
        page === "all" &&
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-semibold">What kind of wall do you want to cook today??</h1>
          <div className="w-full pr-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {WallCardTypesConstants.map((card) => (
              <WallCardTypes key={card.key} title={card.title} desc={card.desc} img={card.img} slug={card.slug} url={card.url!} />
            ))}
          </div>
        </div>
      }
      {
        page === "editing" && (
          <div>
            <EditWallOfLove />
          </div>
        )
      }
      {
        page === "final" && (
          <div>
            <Button onClick={() => setPage("editing", data)}>Go back <ArrowLeftIcon /> </Button>
            <div>{page} ----- {data}</div>
          </div>
        )
      }
    </div>
  );
};

