"use client";

import axios from "axios";
import { useSpaceDataStore } from "@/store/useSpaceDataStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PartyPopperIcon } from 'lucide-react';
import { toast } from "sonner";
import { OnboardingLoader } from "./OnboardingLoader";

const baseUrl =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
    ? "http://localhost:3000"
    : "https://www.viewus.in";

const formSchema = z.object({
  projectName: z
    .string()
    .min(3, {
      message: "name needs to be at least 3 characters",
    })
    .max(30, {
      message: "Title must be 30 characters or less.",
    }),
  projectSlug: z
    .string()
    .min(3, {
      message: "slug needs to be at least 3 characters",
    })
    .max(30, {
      message: "Description must be 30 characters or less.",
    }),
});

export const Onboarding = () => {
  const router = useRouter();
  const params = useSearchParams();
  const paramsError = params.get("error");
  const [error, setError] = useState<null | string>(null);
  const {
    spaceCreationDetails: spaceCreationDetailsState,
    setSpaceCreationDetails,
  } = useSpaceDataStore();
  const {
    spaceCreationDetails,
    coverPage,
    userInformation,
    testimonialType,
    testimonialPageType,
    thankyou,
    design,
  } = useSpaceDataStore();
  const [isLoading, setIsLoading] = useState(false);


  const initializeSpaceData = useSpaceDataStore(
    (state) => state.initializeSpaceData
  );

  useEffect(() => {
    initializeSpaceData();
  }, [initializeSpaceData]);

  useEffect(() => {
    if (paramsError === "missingDetails")
      setError("you need to add these fields to save this space");
  }, [paramsError]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: spaceCreationDetailsState.projectName || "",
      projectSlug: spaceCreationDetailsState.projectSlug || "",
    },
  });

  const onFieldChange = (field: keyof z.infer<typeof formSchema>, value: string) => {
    setSpaceCreationDetails({ ...spaceCreationDetailsState, [field]: value });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (
      !values.projectSlug ||
      !values.projectName ||
      values.projectName.length === 0 ||
      values.projectSlug.length === 0
    ) {
      setError("Please fill in all fields");
      return;
    }
    router.push("/space/slug");
  }

  const handleSaveConfirm = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    if (
      !values.projectSlug ||
      !values.projectName ||
      values.projectName.length === 0 ||
      values.projectSlug.length === 0
    ) {
      setError("Please fill in all fields");
      return;
    }
    // Validate required fields
    if (
      spaceCreationDetails.projectSlug === null ||
      spaceCreationDetails.projectName === null
    ) {
      return router.push("/onboarding?error=missingDetails");
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

      const url = `${baseUrl}/api/space/create`

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === true) {
        router.push(`/space/${spaceCreationDetails.projectSlug}`);
        sessionStorage.clear();
      } else {
        toast.error(response.data.message);
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
    <div className="w-full max-h-screen h-full flex justify-center items-center gap-4">
      {
        isLoading ? (<OnboardingLoader />) : (

          <div className="lg:w-1/2 space-y-6 w-full mx-3 md:w-3/5 xl:mx-0 xl:w-1/4 flex  flex-col border-none shadow-sm p-4 rounded-lg">
            <div className="w-full">
              <h1 className="text-4xl text-center text-black font-bold">Create workspace</h1>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 mt-8"
                >
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Workspace Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What is your project name"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              onFieldChange('projectName', e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectSlug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Workspace Slug <span className="text-[8px] text-red-600">This can&apos;t be changed</span></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter a unique slug for generating a URL for your space"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              onFieldChange('projectSlug', e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
            {error && <p className="text-sm text-red-600">*{error}*</p>}
            <Button
              type="submit"
              className="w-full bg-[#71D4FF] text-black rounded-3xl py-3 hover:bg-[#71D4FF] hover:bg-opacity-80"
              onClick={form.handleSubmit(handleSaveConfirm)}
            >
              Let&apos;s Go
            </Button>
          </div>
        )
      }
    </div>
  );
};


