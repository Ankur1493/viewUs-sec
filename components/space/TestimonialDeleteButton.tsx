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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="p-1 cursor-pointer">
          <Trash2 size={20} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent ref={dialogContentRef} className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            testimonial and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-500 hover:bg-opacity-90">
            <div onClick={deleteKarTestimonial}>Delete</div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
