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
import axios from "axios";
import { toast } from "sonner";
import { SpaceLoader } from "@/components/loaders/SpaceLoader";

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
  id?: string | undefined;
  className?: string;
  variant?: ButtonVariant;
  page?: "create" | "edit";
  slug?: string | undefined;
}
const baseUrl =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
    ? "http://localhost:3000"
    : "https://www.viewus.in";

export const SaveButton = ({
  id,
  className,
  variant,
  page,
  slug,
}: SaveButtonProps) => {
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsSaveDialogOpen(true);
  };

  const handleSaveConfirm = async () => {
    setIsSaveDialogOpen(false);
    setIsLoading(true);

    // Validate required fields
    if (
      spaceCreationDetails.projectSlug === null ||
      spaceCreationDetails.projectName === null
    ) {
      if (page === "create")
        return router.push("/space/create?error=missingDetails");
      else {
        return router.push(`/space/${slug}?error=missingDetails`);
      }
    }

    try {
      // Create a FormData object
      const formData = new FormData();

      // Append fields
      formData.append(
        "spaceCreationDetails",
        JSON.stringify(spaceCreationDetails)
      );
      formData.append("coverPage", JSON.stringify(coverPage));
      if (coverPage.logo) formData.append("logo", coverPage.logo);

      formData.append("userInformation", JSON.stringify(userInformation));
      formData.append("testimonialType", JSON.stringify(testimonialType));
      formData.append(
        "testimonialPageType",
        JSON.stringify(testimonialPageType)
      );
      formData.append("thankyou", JSON.stringify(thankyou));
      formData.append("design", JSON.stringify(design));

      console.log(coverPage);

      const url =
        page === "create"
          ? `${baseUrl}/api/space/create`
          : `${baseUrl}/api/space/edit?id=${id}`;

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response
      if (response.data.status === true) {
        console.log("Request received successfully");
        router.push(`/space/${spaceCreationDetails.projectSlug}/public`);
        sessionStorage.clear();
      } else {
        toast.error(response.data.message);
        console.error("Failed to create space:", response.data.message);
      }
    } catch (error) {
      let errorMessage = "An unknown error occurred";

      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        errorMessage =
          error.response?.data?.message || "Failed to process request";
      } else if (error instanceof Error) {
        // Generic JavaScript error handling
        errorMessage = error.message;
      }

      toast.error(errorMessage);
      console.error("Error sending data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <SpaceLoader />
      ) : (
        <div>
          <div>
            <Button
              variant={variant}
              className={className}
              onClick={handleSave}
            >
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
                <Button variant="outline" onClick={() => handleSaveConfirm()}>
                  No
                </Button>
                <Button onClick={() => handleSaveConfirm()}>Yes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
};
