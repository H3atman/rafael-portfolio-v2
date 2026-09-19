import readingTime from "reading-time";
import type { Root, Yaml } from "mdast";
import type { VFile } from "vfile";

/**
 * Injects a `readingTime` field into each MDX file's frontmatter.
 *
 * Reading time is measured against the raw markdown body with the frontmatter
 * block stripped, matching what `gray-matter` produced before the migration.
 * Must run after remark-frontmatter (which creates the yaml node) and before
 * remark-mdx-frontmatter (which turns it into an export).
 */
export function remarkReadingTime() {
  return (tree: Root, file: VFile) => {
    const body = String(file.value).replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
    const yamlNode = tree.children.find(
      (node): node is Yaml => node.type === "yaml"
    );

    if (yamlNode) {
      yamlNode.value += `\nreadingTime: ${JSON.stringify(readingTime(body).text)}`;
    }
  };
}
