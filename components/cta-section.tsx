import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar01Icon, MailIcon } from "@hugeicons/core-free-icons";
import { config } from "@/lib/config";

export function CTASection() {
  return (
    <section className="py-24 bg-primary/5 border-y border-primary/10 px-6">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Streamline Your Operations?
          </h2>
          <p className="text-xl text-muted-foreground">
            Whether you need to automate a complex workflow, integrate new
            software, or make sense of your data, I can help you build a
            scalable foundation for growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 px-8 text-base"
              asChild
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
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-12 px-8 text-base bg-background"
              asChild
            >
              <Link href="mailto:rafael@rvcodes.com">
                <HugeiconsIcon
                  icon={MailIcon}
                  strokeWidth={2}
                  className="w-5 h-5 mr-2"
                />
                Send an Email
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
