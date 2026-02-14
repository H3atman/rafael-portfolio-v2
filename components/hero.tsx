import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Calendar01Icon,
} from "@hugeicons/core-free-icons";
import { config } from "@/lib/config";

export function Hero() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,var(--primary)_0%,transparent_100%)] opacity-5 blur-[100px]" />

      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-4 sm:mb-6">
          Operations Business Manager
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
          Specializing in{" "}
          <span className="text-foreground font-medium">System Integration</span>,{" "}
          <span className="text-foreground font-medium">
            Business Process Automation
          </span>
          , and{" "}
          <span className="text-foreground font-medium">Data Processing</span>.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-muted/50 rounded-full text-sm font-medium border border-border/50">
            <span className="text-primary font-bold">3+ Years</span> BPA &
            Integration
          </div>
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-muted/50 rounded-full text-sm font-medium border border-border/50">
            <span className="text-primary font-bold">6+ Years</span> Data
            Processing
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto h-12 px-8 text-base shadow-lg shadow-primary/20"
          >
            <Link href={config.bookingUrl} target="_blank">
              <HugeiconsIcon
                icon={Calendar01Icon}
                strokeWidth={2}
                className="w-5 h-5 mr-2"
              />
              Book a Call
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-12 px-8 text-base"
          >
            <Link href="#projects">
              View Projects{" "}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                strokeWidth={2}
                className="w-5 h-5 ml-2"
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
