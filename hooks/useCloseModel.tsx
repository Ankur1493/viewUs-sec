"use client";
import { useModal } from "@/components/ui/animated-modal";
import { useEffect } from "react";

export const useCloseModal = (shouldClose: boolean) => {
  const { setOpen } = useModal();

  useEffect(() => {
    if (shouldClose) {
      setOpen(false);
    }
  }, [shouldClose, setOpen]);
};
