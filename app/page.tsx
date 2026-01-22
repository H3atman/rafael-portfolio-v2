import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { RecentProjects } from "@/components/recent-projects";
import { CTASection } from "@/components/cta-section";

export default function Page() {
  return (
    <>
      <Hero />
      <Services />
      <RecentProjects />
      <CTASection />
    </>
  );
}
