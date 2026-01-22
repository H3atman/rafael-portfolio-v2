import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon, Linkedin01Icon } from "@hugeicons/core-free-icons";

export function Footer() {
  return (
    <footer className="border-t py-12 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <div className="text-lg font-bold mb-2">Rafael Portfolio</div>
          <p className="text-sm text-muted-foreground">
            Operations Business Manager & Automation Specialist
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <HugeiconsIcon
              icon={Linkedin01Icon}
              strokeWidth={2}
              className="w-5 h-5"
            />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <HugeiconsIcon
              icon={GithubIcon}
              strokeWidth={2}
              className="w-5 h-5"
            />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>

        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
