import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { MDXImage, Callout, Video, YouTubeVideo } from "@/components/mdx";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom styled headings
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 text-4xl font-bold tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 text-3xl font-semibold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-2 text-2xl font-semibold">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-4 mb-2 text-xl font-semibold">{children}</h4>
    ),

    // Custom paragraph
    p: ({ children }) => (
      <p className="mb-4 leading-7 text-muted-foreground">{children}</p>
    ),

    // Custom links
    a: ({ href, children }) => (
      <Link
        href={href || "#"}
        className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
      >
        {children}
      </Link>
    ),

    // Custom image with Next.js optimization
    img: (props) => (
      <Image
        width={1200}
        height={630}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        className="rounded-lg my-6"
        {...(props as ImageProps)}
        alt={props.alt || ""}
      />
    ),

    // Custom blockquote/callout
    blockquote: ({ children }) => (
      <blockquote className="mt-4 mb-4 border-l-4 border-primary pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),

    // Custom code blocks
    code: ({ children }) => (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-4 mt-4 overflow-x-auto rounded-lg bg-muted p-4">
        {children}
      </pre>
    ),

    // Custom lists
    ul: ({ children }) => (
      <ul className="my-4 ml-6 list-disc [&>li]:mt-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-muted-foreground leading-7">{children}</li>
    ),

    // Custom table
    table: ({ children }) => (
      <div className="my-6 w-full overflow-y-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-muted/50 transition-colors uppercase text-xs font-bold tracking-wider text-muted-foreground border-b border-border">
        {children}
      </thead>
    ),
    tr: ({ children }) => (
      <tr className="border-b border-border last:border-0 transition-colors hover:bg-muted/20">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-4 text-left font-semibold text-foreground [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-4 text-left text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </td>
    ),

    // Custom horizontal rule
    hr: () => <hr className="my-8 border-border" />,

    // Custom strong/bold
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),

    // Custom em/italic
    em: ({ children }) => <em className="italic">{children}</em>,

    // Custom components for MDX
    Image: MDXImage,
    Callout,
    Video,
    YouTubeVideo,

    // Spread any additional custom components
    ...components,
  };
}
