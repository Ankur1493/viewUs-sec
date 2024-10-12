"use client";
import React, { useState } from "react";

export const TagSelection: React.FC = () => {
  const tags = [
    "Easy to use",
    "Great value",
    "Innovative",
    "UX/UI",
    "Invaluable resource",
    "Time saver",
    "Great features",
    "Engaging",
    "Customer-focused",
    "Provides results",
  ];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const availableTags = tags.filter((tag) => !selectedTags.includes(tag));

  return (
    <div className="flex flex-col py-10 font-satoshi">
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
              <span
                onClick={() => toggleTag(tag)}
                className="ml-2 cursor-pointer text-[20px]"
              >
                ×
              </span>
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 border rounded-full text-[14px] border-[#7CCE3B] 
                ${
                  selectedTags.includes(tag)
                    ? "bg-[#C2F19D] text-black"
                    : "text-black hover:bg-green-50"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
