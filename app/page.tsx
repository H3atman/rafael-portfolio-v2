import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { RecentProjects } from "@/components/recent-projects";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <RecentProjects />
      <CTASection />
      <Footer />
    </main>
  );
}
