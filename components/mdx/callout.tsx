import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InformationCircleIcon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  Alert02Icon,
} from "@hugeicons/core-free-icons";
import { ReactNode } from "react";

type CalloutType = "info" | "warning" | "success" | "danger";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
}

const calloutConfig: Record<
  CalloutType,
  {
    icon: typeof InformationCircleIcon;
    containerClass: string;
    iconClass: string;
  }
> = {
  info: {
    icon: InformationCircleIcon,
    containerClass: "border-blue-500/30 bg-blue-500/10",
    iconClass: "text-blue-500",
  },
  warning: {
    icon: AlertCircleIcon,
    containerClass: "border-yellow-500/30 bg-yellow-500/10",
    iconClass: "text-yellow-500",
  },
  success: {
    icon: CheckmarkCircle02Icon,
    containerClass: "border-green-500/30 bg-green-500/10",
    iconClass: "text-green-500",
  },
  danger: {
    icon: Alert02Icon,
    containerClass: "border-red-500/30 bg-red-500/10",
    iconClass: "text-red-500",
  },
};

export function Callout({
  type = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const config = calloutConfig[type];

  return (
    <div
      className={cn(
        "my-6 flex gap-4 rounded-lg border p-4",
        config.containerClass,
        className
      )}
    >
      <div className={cn("flex-shrink-0 mt-0.5", config.iconClass)}>
        <HugeiconsIcon icon={config.icon} strokeWidth={2} className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold text-foreground mb-1">{title}</p>
        )}
        <div className="text-sm text-muted-foreground [&>p]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
