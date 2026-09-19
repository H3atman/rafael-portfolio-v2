import { buildMeta } from "@/lib/meta";
import { Hero } from "@/components/hero";
import { ProcessSteps } from "@/components/process-steps";
import { HorizontalScrollLoop } from "@/components/horizontal-scroll-loop";
import { Services } from "@/components/services";
import { RecentProjects } from "@/components/recent-projects";
import { CTASection } from "@/components/cta-section";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return buildMeta({ canonical: "/" });
}

export default function Home() {
  return (
    <>
      <Hero />
      <HorizontalScrollLoop />
      <ProcessSteps />
      <Services />
      <RecentProjects />
      <CTASection />
    </>
  );
}
