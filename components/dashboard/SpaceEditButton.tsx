import React from "react";
import { EditIcon } from "lucide-react";
import Link from "next/link";

interface SpaceDeleteButtonProps {
  slug: string;
}

export const SpaceEditButton = ({ slug }: SpaceDeleteButtonProps) => {
  return (
    <div>
      <Link href={`/space/${slug}/edit`} className="p-1 cursor-pointer">
        <EditIcon size={20} />
      </Link>
    </div>
  );
};
