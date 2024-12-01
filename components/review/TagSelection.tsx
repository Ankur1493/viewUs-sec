"use client";
import React from "react";
import useReviewPageStore from "@/store/useReviewPageStore";
import { ReviewForm } from "@/types";

export const TagSelection = ({ reviewForm }: { reviewForm: ReviewForm }) => {
  const { selectedTags, setSelectedTags } = useReviewPageStore();
  const tags = reviewForm.details ? reviewForm.details.tags : [];

  const availableTags = tags.filter((tag) => !selectedTags.includes(tag));

  return (
    <>
      {tags && tags.length > 0 && (
        <div className="flex flex-col py-8 font-satoshi">
          <div>
            <h2 className="text-[16px] font-[500] leading-[24px] mb-4">
              What did we do well?
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#C2F19D] text-black rounded-full text-[14px] flex items-center"
                >
                  {tag}{" "}
                  <button
                    onClick={() => setSelectedTags(tag)}
                    className="ml-2 cursor-pointer text-[20px]"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTags(tag)}
                  disabled={selectedTags.length >= 3}
                  className={`px-3 py-1 border rounded-full text-[14px] border-[#7CCE3B] 
                ${
                  selectedTags.includes(tag)
                    ? "bg-[#C2F19D] text-black"
                    : "text-black hover:bg-green-50"
                } ${selectedTags.length >= 3 && "cursor-not-allowed"}`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {selectedTags.length >= 3 && (
              <p className="text-left text-sm text-red-500 pt-2">
                You can select maximum 3 tags at a time.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
