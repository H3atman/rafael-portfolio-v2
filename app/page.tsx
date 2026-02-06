import { Hero } from "@/components/hero";
import { ProcessSteps } from "@/components/process-steps";
import { HorizontalScrollLoop } from "@/components/horizontal-scroll-loop";
import { Services } from "@/components/services";
import { RecentProjects } from "@/components/recent-projects";
import { CTASection } from "@/components/cta-section";

export default function Page() {
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
