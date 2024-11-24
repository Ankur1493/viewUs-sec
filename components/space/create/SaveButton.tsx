import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSpaceDataStore } from "@/store/useSpaceDataStore";

type ButtonVariant =
  | "outline"
  | "link"
  | "form"
  | "main"
  | "default"
  | "destructive"
  | "secondary"
  | "ghost"
  | "formOutline"
  | null
  | undefined;

interface SaveButtonProps {
  className?: string;
  variant?: ButtonVariant;
}

export const SaveButton = ({ className, variant }: SaveButtonProps) => {
  const router = useRouter();
  const {
    spaceCreationDetails,
    coverPage,
    userInformation,
    testimonialType,
    testimonialPageType,
    thankyou,
    design,
  } = useSpaceDataStore();
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const handleSave = () => {
    setIsSaveDialogOpen(true);
  };

  const handleSaveConfirm = (confirm: boolean) => {
    setIsSaveDialogOpen(false);
    if (
      spaceCreationDetails.projectSlug === null ||
      spaceCreationDetails.projectName === null
    ) {
      return router.push("/space/create?error=missingDetails");
    }

    console.log("here's the data");
    console.log({
      spaceCreationDetails,
      coverPage,
      userInformation,
      testimonialType,
      testimonialPageType,
      thankyou,
      design,
    });
    //add a save call
    if (confirm) {
      router.push(`/space/${spaceCreationDetails.projectSlug}`);
    }
  };

  return (
    <div>
      <div>
        <Button variant={variant} className={className} onClick={handleSave}>
          Save
        </Button>
      </div>
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Are you ready to collect Testimonials</DialogTitle>
            <DialogDescription>
              Your will be redirected in a minute.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleSaveConfirm(false)}>
              No
            </Button>
            <Button onClick={() => handleSaveConfirm(true)}>Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
