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
    // <AlertDialog open={open} onOpenChange={setOpen}>
    //   <AlertDialogTrigger asChild>
    //     <div className="p-1 cursor-pointer flex justify-center items-center">
    //       <Trash2 size={20} />
    //     </div>
    //   </AlertDialogTrigger>
    //   <AlertDialogContent
    //     ref={dialogContentRef}
    //     className="bg-white w-[350px] rounded md:w-full"
    //   >
    //     <AlertDialogHeader>
    //       <AlertDialogTitle>Are you sure?</AlertDialogTitle>
    //       <AlertDialogDescription>
    //         This action cannot be undone. This will permanently delete this
    //         SPACE and remove the data from our servers.
    //       </AlertDialogDescription>
    //     </AlertDialogHeader>
    //     <AlertDialogFooter>
    //       <AlertDialogCancel>Cancel</AlertDialogCancel>
    //       <AlertDialogAction className="bg-red-500 hover:bg-red-500 hover:bg-opacity-90">
    //         <div onClick={deleteKarSpace}>Delete</div>
    //       </AlertDialogAction>
    //     </AlertDialogFooter>
    //   </AlertDialogContent>
    // </AlertDialog>
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="p-1 cursor-pointer">
          <Trash2 size={20} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[450px] gap-6 bg-white">
        <AlertDialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <AlertDialogTitle className="text-center text-xl">
            Delete Testimonial
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            Are you sure you want to delete this space? This action cannot be
            undone and the data will be permanently removed from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-2 sm:flex-row">
          <AlertDialogCancel className="mt-0 flex-1">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteKarSpace}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
