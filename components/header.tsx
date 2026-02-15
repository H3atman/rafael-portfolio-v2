"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { config } from "@/lib/config";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Calendar01Icon } from "@hugeicons/core-free-icons";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-muted">
            <Image
              src="/logo.png"
              alt="RVCodes Logo"
              fill
              className="object-contain brightness-0 dark:brightness-0"
              priority
            />
          </div>
          <span className="font-bold text-lg hidden sm:inline-block">
            Rafael Villanueva
          </span>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Projects
          </Link>
          <ThemeToggle />
          <Button asChild size="sm">
            <Link href={config.bookingUrl} target="_blank" rel="noopener noreferrer">
              Book a Call
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation - Visible only on mobile */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <HugeiconsIcon
                  icon={Menu01Icon}
                  strokeWidth={2}
                  className="h-5 w-5"
                />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0">
              <SheetHeader className="p-6 pb-4 border-b">
                <SheetTitle className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src="/logo.png"
                      alt="RVCodes Logo"
                      fill
                      className="object-contain brightness-0 dark:brightness-0"
                    />
                  </div>
                  <span className="font-bold">Rafael Villanueva</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-6 gap-1">
                <Link
                  href="/"
                  className="flex items-center py-3 px-4 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  className="flex items-center py-3 px-4 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  Projects
                </Link>
                <div className="mt-4 pt-4 border-t">
                  <Button asChild className="w-full h-12" size="lg">
                    <Link href={config.bookingUrl} target="_blank" rel="noopener noreferrer">
                      <HugeiconsIcon
                        icon={Calendar01Icon}
                        strokeWidth={2}
                        className="w-5 h-5 mr-2"
                      />
                      Book a Call
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
