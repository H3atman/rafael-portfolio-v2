import { cn } from "@/lib/utils";

interface VideoProps {
  src: string;
  title?: string;
  caption?: string;
  className?: string;
  aspectRatio?: "16:9" | "4:3" | "1:1";
}

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
  caption?: string;
  className?: string;
}

const aspectRatioClasses = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
};

export function Video({
  src,
  title,
  caption,
  className,
  aspectRatio = "16:9",
}: VideoProps) {
  return (
    <figure className="my-8">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-border",
          aspectRatioClasses[aspectRatio],
          className
        )}
      >
        <video
          src={src}
          title={title}
          controls
          className="absolute inset-0 w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function YouTubeVideo({
  videoId,
  title = "YouTube video player",
  caption,
  className,
}: YouTubeVideoProps) {
  return (
    <figure className="my-8">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-border aspect-video",
          className
        )}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
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
