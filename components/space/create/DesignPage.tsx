"use client";

import { Button } from "@/components/ui/button";
import { gradients } from "@/constants/gradients";
import { useRouter } from "next/navigation";
import { HexColorPicker } from "react-colorful";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CoverPagePreview } from "./preview/CoverPagePreview";
import { useSpaceDataStore } from "@/store/useSpaceDataStore";
import { Plus } from "lucide-react";
import { useState } from "react";

const defaultColors = ["#71D4FF", "#FF71D4", "#71FF9F", "#FFD471", "#7171FF"];

const formSchema = z.object({
  gradientType: z.number(),
  btnColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Invalid hex color code",
  }),
});

export const DesignPage = () => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const router = useRouter();
  const {
    spaceCreationDetails,
    coverPage,
    userInformation,
    testimonialType,
    testimonialPageType,
    thankyou,
    design,
    setDesign,
  } = useSpaceDataStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gradientType: design.gradientType,
      btnColor: design.btnColor,
    },
  });

  useEffect(() => {
    form.setValue("gradientType", design.gradientType);
    form.setValue("btnColor", design.btnColor);
  }, [design, form]);

  const handleGradientSelect = (gradientType: number) => {
    setDesign({ ...design, gradientType });
    form.setValue("gradientType", gradientType);
  };

  const handleButtonColorChange = (color: string) => {
    setDesign({ ...design, btnColor: color });
    form.setValue("btnColor", color);
    setIsColorPickerOpen(false);
  };

  const handleSubmit = () => {
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
    //  if (confirm) {
    router.push(`/space/${spaceCreationDetails.projectSlug}`);
    //  }
  };

  return (
    <div className="w-full pl-2 max-h-screen h-[85vh] flex justify-center overflow-hidden gap-4">
      <div className="max-w-[448px] h-full space-y-6 px-6 pt-5 overflow-y-auto">
        <div className="flex-grow">
          <div className="w-full">
            <div className="space-y-1">
              <div className="text-[36px] font-medium">
                Last step! Add the finishing touches to your form
              </div>
              <p className="text-[16px] font-normal pb-4">
                Choose a style that matches your brand and personality
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={handleSubmit} className="space-y-8 pt-2">
                <FormField
                  control={form.control}
                  name="gradientType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CHOOSE A BACKGROUND GRADIENT</FormLabel>
                      <FormControl>
                        <div className="flex gap-2 flex-wrap">
                          {gradients.map((gradient) => (
                            <button
                              key={gradient.id}
                              type="button"
                              className={`w-10 h-10 rounded-full cursor-pointer transition-all ${
                                field.value === gradient.id
                                  ? "ring-2 ring-offset-2 ring-blue-500"
                                  : "hover:ring-2 hover:ring-offset-2 hover:ring-blue-500"
                              }`}
                              style={{ background: gradient.style }}
                              aria-label={`Select gradient ${gradient.id}`}
                              onClick={() => handleGradientSelect(gradient.id)}
                            />
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="btnColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CHOOSE BUTTON COLOR</FormLabel>
                      <FormControl>
                        <div className="flex gap-2 flex-wrap">
                          {defaultColors.map((color) => (
                            <button
                              key={color}
                              type="button"
                              className={`w-10 h-10 rounded-full cursor-pointer transition-all ${
                                field.value === color
                                  ? "ring-2 ring-offset-2 ring-blue-500"
                                  : "hover:ring-2 hover:ring-offset-2 hover:ring-blue-500"
                              }`}
                              style={{ backgroundColor: color }}
                              aria-label={`Select color ${color}`}
                              onClick={() => handleButtonColorChange(color)}
                            />
                          ))}
                          <Popover
                            open={isColorPickerOpen}
                            onOpenChange={setIsColorPickerOpen}
                          >
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                className="w-10 h-10 rounded-full cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                                aria-label="Add custom color"
                              >
                                <Plus className="w-6 h-6 text-gray-500" />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <div className="p-4">
                                <HexColorPicker
                                  color={field.value}
                                  onChange={handleButtonColorChange}
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </FormControl>
                      <div className="flex items-center gap-2 mt-2">
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: field.value }}
                        ></div>
                        <span className="text-sm font-medium">
                          {field.value}
                        </span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <CoverPagePreview
              btnColor={form.watch("btnColor")}
              gradientType={form.watch("gradientType")}
            />
          </div>
          <div className="p-4 flex justify-center items-center">
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  router.push("/space/create?page=6");
                }}
                variant="outline"
                className="border-[#DDDEDF] rounded-full px-20 py-4"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="form"
                onClick={handleSubmit}
                className=" px-20 py-4"
              >
                Finish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
