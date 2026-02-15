"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Calendar01Icon } from "@hugeicons/core-free-icons";
import { ProjectMeta } from "@/lib/mdx";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectMeta;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const parsedDate = project.frontmatter.date
    ? new Date(project.frontmatter.date)
    : null;
  const projectYear =
    parsedDate && !Number.isNaN(parsedDate.getTime())
      ? parsedDate.getFullYear()
      : null;

  return (
    <Link href={`/projects/${project.slug}`} passHref>
      <Card
        className={cn(
          "overflow-hidden h-full flex flex-col hover:border-primary/50 transition-colors group cursor-pointer",
          className
        )}
      >
        <div className="relative w-full aspect-video overflow-hidden bg-muted">
          {project.frontmatter.thumbnail ? (
            <Image
              src={project.frontmatter.thumbnail}
              alt={project.frontmatter.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No Thumbnail
            </div>
          )}
        </div>
        <CardHeader className="pb-2 p-4 sm:p-6">
          <div className="flex justify-between items-start gap-2 mb-2">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.frontmatter.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs font-normal"
                >
                  {tag}
                </Badge>
              ))}
              {project.frontmatter.tags.length > 2 && (
                <Badge variant="outline" className="text-xs font-normal">
                  +{project.frontmatter.tags.length - 2}
                </Badge>
              )}
            </div>
            {projectYear && (
              <div className="flex items-center text-xs text-muted-foreground shrink-0">
                <HugeiconsIcon
                  icon={Calendar01Icon}
                  strokeWidth={2}
                  className="w-3 h-3 mr-1"
                />
                {projectYear}
              </div>
            )}
          </div>
          <h3 className="font-semibold text-lg sm:text-xl leading-tight group-hover:text-primary transition-colors">
            {project.frontmatter.title}
          </h3>
        </CardHeader>
        <CardContent className="flex-grow p-4 pt-0 sm:p-6 sm:pt-0">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {project.frontmatter.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 sm:p-6 pt-0 text-primary text-sm font-medium flex items-center">
          Read Case Study{" "}
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            strokeWidth={2}
            className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
          />
        </CardFooter>
      </Card>
    </Link>
  );
}
