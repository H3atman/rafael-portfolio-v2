
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

const POSTHOG_KEY = import.meta.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export function PostHogProvider({ children }: { children: ReactNode }) {
  const pathname = useLocation().pathname;

  useEffect(() => {
    if (!POSTHOG_KEY) return;
    // This effect runs again whenever the provider remounts, and a second
    // init() is a no-op that logs "[PostHog.js] You have already initialized
    // PostHog!". __loaded is set by init(), so it tells us we already ran.
    if (posthog.__loaded) return;

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      defaults: "2026-01-30",
      capture_pageview: false,
      capture_pageleave: true,
    });
  }, []);

  useEffect(() => {
    if (!POSTHOG_KEY) return;

    const url = `${window.location.origin}${window.location.pathname}${window.location.search}`;

    posthog.capture("$pageview", {
      $current_url: url,
    });
  }, [pathname]);

  if (!POSTHOG_KEY) {
    return <>{children}</>;
  }

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
