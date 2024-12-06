"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteSpace } from "@/actions/space";
import { useRouter } from "next/navigation";

interface SpaceDeleteButtonProps {
  spaceId: string;
}

export const SpaceDeleteButton = ({ spaceId }: SpaceDeleteButtonProps) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const dialogContentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogContentRef.current &&
        !dialogContentRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const deleteKarSpace = async () => {
    const response = await deleteSpace(spaceId);
    if (response) {
      toast.success("space deleted successfully");
      router.push("/dashboard");
    } else {
      toast.error("failed to delete");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="p-1 cursor-pointer flex justify-center items-center">
          <Trash2 size={20} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent
        ref={dialogContentRef}
        className="bg-white w-[350px] rounded md:w-full"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            SPACE and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-500 hover:bg-opacity-90">
            <div onClick={deleteKarSpace}>Delete</div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
