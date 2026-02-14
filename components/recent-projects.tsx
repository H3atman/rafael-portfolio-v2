import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { getRecentProjects } from "@/lib/mdx";
import { ProjectCard } from "@/components/project-card";

export function RecentProjects() {
  const projects = getRecentProjects(3);

  return (
    <section id="projects" className="py-16 sm:py-24 container px-4 sm:px-6 mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight sm:text-4xl mb-3 sm:mb-4">
            Recent Projects
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Case studies demonstrating my expertise in automation and data.
          </p>
        </div>
        <Button variant="ghost" asChild className="hidden md:inline-flex group">
          <Link href="/projects">
            View All Projects{" "}
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={2}
              className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-8 sm:mt-12 text-center md:hidden">
        <Button variant="outline" asChild className="w-full sm:w-auto h-12">
          <Link href="/projects">
            View All Projects{" "}
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={2}
              className="w-4 h-4 ml-2"
            />
          </Link>
        </Button>
      </div>
    </section>
  );
}
