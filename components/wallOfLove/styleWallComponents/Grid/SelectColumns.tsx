import { useState } from "react";
import { useWallTypeStore } from "@/store/useWallTypeStore";
import { WallSidebarWrapper } from "../WallSidebarWrapper";

export const SelectColumns = () => {
  const { url, setUrl } = useWallTypeStore();
  const [columns, setColumns] = useState(4);
  const options = [2, 3, 4];

  const handleColumnsChange = (newColumns: number) => {
    setColumns(newColumns);
    if (url) {
      const testUrl = new URL(url!);
      testUrl.searchParams.set("columns", newColumns.toString());
      setUrl(testUrl.toString());
    }
  };

  return (
    <WallSidebarWrapper
      header="Columns"
      description="Select the number of columns"
    >
      {" "}
      <div className="w-full flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option}
            className={`py-1 px-2 rounded-md text-[10px] lg:text-xs ${
              columns === option
                ? "bg-primary text-white"
                : "bg-gray-100 text-black"
            }`}
            onClick={() => handleColumnsChange(option)}
          >
            {option} Columns
          </button>
        ))}
      </div>
    </WallSidebarWrapper>
  );
};
