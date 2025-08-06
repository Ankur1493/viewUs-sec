"use client";
import { Logo } from "@/components/svgs/logo";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-background mt-6 p-2 rounded-2xl">
        <nav className="flex items-center w-full justify-between">
          <div className="flex items-center gap-2 flex-1">
            <Logo className="size-9" />
            <p className="text-xl font-bold font-primary">ViewUs</p>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center flex-1 justify-center gap-8">
            <div className="text-md font-medium cursor-pointer hover:text-muted-foreground">
              Home
            </div>
            <div className="text-md font-medium cursor-pointer hover:text-muted-foreground">
              Pricing
            </div>
            <div className="text-md font-medium cursor-pointer hover:text-muted-foreground">
              About
            </div>
          </div>

          {/* Desktop Buttons - Hidden on mobile */}
          <div className="hidden md:flex items-center flex-1 justify-end gap-2">
            <Button variant={"secondary"} className="border">
              Login
            </Button>
            <Button>Get Started</Button>
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="h-10 w-10"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay and Popup */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeMobileMenu}
          />

          {/* Popup Menu */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 max-h-fit bg-white rounded-2xl p-6 shadow-lg">
            {/* Close Button */}

            {/* Navigation Items */}
            <div className="flex flex-col gap-2 mb-4">
              <div
                className="text-lg bg-muted/60 rounded-xl hover:bg-muted font-medium cursor-pointer text-center py-2"
                onClick={closeMobileMenu}
              >
                Home
              </div>
              <div
                className="text-lg bg-muted/60 rounded-xl hover:bg-muted font-medium cursor-pointer text-center py-2"
                onClick={closeMobileMenu}
              >
                Pricing
              </div>
              <div
                className="text-lg bg-muted/60 rounded-xl hover:bg-muted font-medium cursor-pointer text-center py-2"
                onClick={closeMobileMenu}
              >
                About
              </div>
            </div>

            {/* Buttons at Bottom */}
            <div className="flex  gap-3">
              <Button className=" h-12 w-full" onClick={closeMobileMenu}>
                Get Started
              </Button>
              <Button
                variant={"secondary"}
                className="border h-12  w-full"
                onClick={closeMobileMenu}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
