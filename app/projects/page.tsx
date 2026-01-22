import { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/mdx";
import { ProjectCard } from "@/components/project-card";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies and projects showcasing expertise in system integration, business process automation, and data processing.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <main className="min-h-screen">
        {/* Header */}
        <section className="py-16 lg:py-24 px-6">
          <div className="container mx-auto">
            <div className="mb-8">
              <Button variant="ghost" size="sm" asChild className="mb-4">
                <Link href="/">
                  <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                Projects
              </h1>
              <p className="text-xl text-muted-foreground">
                A collection of case studies demonstrating my work in automation,
                integration, and data processing. Each project showcases the
                challenges faced and solutions implemented.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="pb-24 px-6">
          <div className="container mx-auto">
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg">No projects found.</p>
                <p className="text-sm mt-2">
                  Check back later for new case studies.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
