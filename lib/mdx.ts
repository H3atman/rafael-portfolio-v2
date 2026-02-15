import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { parseDate } from "@/lib/date";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export interface ProjectFrontmatter {
    title: string;
    description: string;
    date: string;
    tags: string[];
    thumbnail: string;
    hidden?: boolean;
}

export interface Project {
    slug: string;
    frontmatter: ProjectFrontmatter;
    content: string;
    readingTime: string;
}

export interface ProjectMeta {
    slug: string;
    frontmatter: ProjectFrontmatter;
    readingTime: string;
}

export function getAllProjects(): ProjectMeta[] {
    // Read-only environments (e.g., serverless) may not allow filesystem writes.
    if (!fs.existsSync(projectsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(projectsDirectory);
    const projects = fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            const fullPath = path.join(projectsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContents);

            return {
                slug,
                frontmatter: data as ProjectFrontmatter,
                readingTime: readingTime(content).text,
            };
        })
        .filter((project) => !project.frontmatter.hidden);

    // Sort by date (newest first)
    return projects.sort((a, b) => {
        const dateB = parseDate(b.frontmatter.date)?.getTime() ?? 0;
        const dateA = parseDate(a.frontmatter.date)?.getTime() ?? 0;
        return dateB - dateA;
    });
}

export function getProjectBySlug(slug: string): Project | null {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        frontmatter: data as ProjectFrontmatter,
        content,
        readingTime: readingTime(content).text,
    };
}

export function getRecentProjects(count: number = 3): ProjectMeta[] {
    return getAllProjects().slice(0, count);
}
