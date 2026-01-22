import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { config } from "@/lib/config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-muted">
            <Image
              src="/logo.png"
              alt="RVCodes Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-bold text-lg hidden sm:inline-block">
            Rafael Villanueva
          </span>
        </Link>

        <nav className="flex items-center gap-6">
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
          <Button asChild size="sm">
            <Link href={config.bookingUrl} target="_blank">
              Book a Call
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
