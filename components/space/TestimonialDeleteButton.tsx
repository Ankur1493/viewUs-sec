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
import { deleteTestimonial } from "@/actions/testimonial";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface TestimonialDeleteButtonProps {
  testimonialId: string;
}

export const TestimonialDeleteButton = ({
  testimonialId,
}: TestimonialDeleteButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const dialogContentRef = React.useRef<HTMLDivElement>(null);
  const params = useParams();
  const spaceSlug = params.slug as string;

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

  const deleteKarTestimonial = async () => {
    const response = await deleteTestimonial(testimonialId, spaceSlug);
    if (response.status) {
      toast("testimonial deleted");
    } else {
      toast(response.message);
    }
  };

  return (
    // <AlertDialog open={open} onOpenChange={setOpen}>
    //   <AlertDialogTrigger asChild>
    //     <div className="p-1 cursor-pointer">
    //       <Trash2 size={20} />
    //     </div>
    //   </AlertDialogTrigger>
    //   <AlertDialogContent ref={dialogContentRef} className="bg-white">
    //     <AlertDialogHeader>
    //       <AlertDialogTitle>Are you sure?</AlertDialogTitle>
    //       <AlertDialogDescription>
    //         This action cannot be undone. This will permanently delete this
    //         testimonial and remove the data from our servers.
    //       </AlertDialogDescription>
    //     </AlertDialogHeader>
    //     <AlertDialogFooter>
    //       <AlertDialogCancel>Cancel</AlertDialogCancel>
    //       <AlertDialogAction className="bg-red-500 hover:bg-red-500 hover:bg-opacity-90">
    //         <div onClick={deleteKarTestimonial}>Delete</div>
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
            Are you sure you want to delete this testimonial? This action cannot
            be undone and the data will be permanently removed from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-2 sm:flex-row">
          <AlertDialogCancel className="mt-0 flex-1">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteKarTestimonial}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
