import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface MDXImageProps extends Omit<ImageProps, "alt"> {
  alt?: string;
  caption?: string;
  className?: string;
}

export function MDXImage({
  src,
  alt = "",
  caption,
  className,
  ...props
}: MDXImageProps) {
  return (
    <figure className="my-8">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-border",
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={630}
          className="w-full h-auto object-cover"
          {...props}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
