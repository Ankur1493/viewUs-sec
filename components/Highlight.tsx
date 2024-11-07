import React from "react";

import { twMerge } from "tailwind-merge";

export const Highlight = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <span className={twMerge("bg-gray-900 px-2 py-1 rounded-lg", className)}>
      {children}
    </span>
  );
};
