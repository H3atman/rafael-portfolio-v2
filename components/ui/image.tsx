import * as React from "react";

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "alt" | "loading"> {
  alt: string;
  src: string;
  /** Reproduces the next/image `fill` layout: absolutely positioned, edge to edge. */
  fill?: boolean;
  /** Maps to loading="eager" fetchPriority="high"; otherwise loading="lazy". */
  priority?: boolean;
  sizes?: string;
}

/**
 * Plain <img> stand-in for next/image. All images are local /public paths, so
 * no loader/CDN story is needed.
 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  function Image({ fill, priority, sizes, style, className, ...props }, ref) {
    const fillStyle: React.CSSProperties = fill
      ? {
          position: "absolute",
          inset: "0px",
          height: "100%",
          width: "100%",
        }
      : {};

    return (
      <img
        ref={ref}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        sizes={sizes}
        style={{ ...fillStyle, ...style }}
        className={className}
        {...props}
      />
    );
  }
);
