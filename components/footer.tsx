import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon, Linkedin01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t py-8 sm:py-12 px-4 sm:px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-muted">
            <Image
              src="/logo.png"
              alt="Rafael Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <div className="text-lg font-bold mb-1">Rafael Portfolio</div>
            <p className="text-sm text-muted-foreground">
              Operations Business Manager & Automation Specialist
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="https://www.linkedin.com/in/villanueva-rafael/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted"
          >
            <HugeiconsIcon
              icon={Linkedin01Icon}
              strokeWidth={2}
              className="w-5 h-5"
            />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://github.com/H3atman"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted"
          >
            <HugeiconsIcon
              icon={GithubIcon}
              strokeWidth={2}
              className="w-5 h-5"
            />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>

        <div className="text-sm text-muted-foreground text-center md:text-right">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
