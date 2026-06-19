import React, { useEffect, useRef } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router";
import { isInternalTrafficEnabled, InternalTrafficWatermark } from "@devgateway/dvz-ui-react/tracker";

/**
 * Type declaration for the runtime env vars injected by the server
 * via a <script> tag in root.tsx Layout (window.ENV = { ... }).
 */
declare global {
  interface Window {
    ENV?: {
      REACT_APP_GA_CODE?: string;
    };
  }
}

// Module-level tracking for GA initialization - ensures GA is only initialized once globally
const initializedGACodes = new Set<string>();
let gaInitialized = false;

interface ClientAnalyticsWrapperProps {
  children: React.ReactNode;
  token?: string; // Optional token prop for future use if needed
}

/**
 * ClientAnalyticsWrapper
 *
 * This component wraps your app content and initializes Google Analytics tracking.
 * It's designed to work ONLY on the client side in SSR environments.
 *
 * The GA code is sourced from the WordPress dviz settings API
 * (`/dg/v1/settings` → `google_analytics_code`), fetched server-side in the
 * root loader and injected into the HTML via `window.ENV.REACT_APP_GA_CODE`.
 * This mirrors how `withGoogleAnalytics` in `@devgateway/dvz-ui-react` reads
 * the code from `SettingsContext`, but works without Redux or the
 * `SettingsProvider` since the root loader handles the fetch at SSR time.
 *
 * Falls back to the `VITE_REACT_APP_GA_CODE` Docker runtime env var if the
 * settings endpoint is unreachable.
 *
 * If internal traffic is detected (via the `_ga_internal_traffic` cookie set
 * by the `/internal-traffic` toggle page), GA is never initialized and no
 * events are sent at all — keeping internal visits completely out of the
 * analytics data.
 *
 * All tracking logic (pageviews, scroll, clicks, time on page) happens here.
 */
export function ClientAnalyticsWrapper({
  children,
}: ClientAnalyticsWrapperProps) {
  const location = useLocation();
  const lastSentPage = useRef<string | null>(null);
  const scrollTracked = useRef<boolean>(false);
  const eventListenersAdded = useRef<boolean>(false);
  const gaCodeRef = useRef<string | null>(null);
  const isInternal = useRef<boolean>(false);

  // Determine internal traffic status and resolve GA code once on the client
  if (typeof window !== "undefined" && !gaCodeRef.current) {
    isInternal.current = isInternalTrafficEnabled();

    if (isInternal.current) {
      console.log(
        "[GA] Internal traffic detected — GA will NOT be initialized and no events will be sent.",
      );
    }

    const envGACode = window.ENV?.REACT_APP_GA_CODE || null;
    gaCodeRef.current = envGACode;

    console.log("[GA] Code resolution:", {
      windowENV: envGACode ? "found" : "not found",
      internal: isInternal.current,
      final: gaCodeRef.current
        ? gaCodeRef.current.substring(0, 5) + "..."
        : "NONE",
    });
  }

  const gaCode = gaCodeRef.current;

  // Initialize GA only once globally (client-side only, external traffic only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isInternal.current) return;

    if (!gaCode) {
      console.warn(
        "[GA] No GA code configured. Set google_analytics_code in WordPress dviz settings or VITE_REACT_APP_GA_CODE in the Docker environment.",
      );
      return;
    }

    if (gaCode === "#REACT_APP_GA_CODE#") {
      console.warn(
        "[GA] GA code is placeholder value, skipping initialization",
      );
      return;
    }

    if (gaInitialized) {
      return;
    }

    if (!initializedGACodes.has(gaCode)) {
      try {
        console.log("[GA] Initializing with code:", gaCode);
        ReactGA.initialize(gaCode);
        initializedGACodes.add(gaCode);
        console.log("[GA] Successfully initialized");
      } catch (error) {
        console.error("[GA] Failed to initialize:", error);
      }
    }
    gaInitialized = true;
  }, [gaCode]);

  // Send pageview only when pathname changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isInternal.current) return;
    if (!gaCode || gaCode === "#REACT_APP_GA_CODE#") return;
    if (!gaInitialized) return;

    const page = location.pathname;

    // Only send if this is a different page than last time
    if (lastSentPage.current === page) {
      return;
    }

    lastSentPage.current = page;
    scrollTracked.current = false; // Reset scroll tracking for new page

    try {
      ReactGA.event("page_view", {
        page_path: page,
      });

      console.log("[GA] pageview sent:", { page });
    } catch (error) {
      console.error("[GA] Failed to send pageview:", error);
    }
  }, [location.pathname, gaCode]);

  // Track user interactions (scroll, click, etc.)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isInternal.current) return;
    if (!gaCode || gaCode === "#REACT_APP_GA_CODE#") return;
    if (!gaInitialized) return;
    if (eventListenersAdded.current) return;

    // Track scroll events
    const handleScroll = () => {
      if (scrollTracked.current) return;

      // Calculate scroll depth
      const scrollPercentage = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100,
      );

      // Only track meaningful scroll (more than 10%)
      if (scrollPercentage > 10) {
        try {
          ReactGA.event("scroll", {
            engagement_type: "scroll",
            scroll_depth: scrollPercentage,
          });
          console.log("[GA] scroll event sent:", { scrollPercentage });
          scrollTracked.current = true;
        } catch (error) {
          console.error("[GA] Failed to send scroll event:", error);
        }
      }
    };

    // Track click events
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Get element text or id or class for identification
      const elementText = target.textContent?.substring(0, 50) || "";
      const elementId = target.id || "";
      const elementClass = target.className || "";

      // Only track if element has meaningful content
      if (!elementText && !elementId && !elementClass) return;

      try {
        ReactGA.event("element_click", {
          element_id: elementId,
          element_class: elementClass,
          element_text: elementText.substring(0, 50),
        });
      } catch (error) {
        // Silently fail for click tracking to avoid spam
      }
    };

    // Track time on page
    const startTime = Date.now();
    const handleUnload = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);

      if (timeOnPage > 3) {
        // Only track if spent more than 3 seconds
        try {
          ReactGA.event("time_on_page", {
            page_path: location.pathname,
            duration_seconds: timeOnPage,
          });
          console.log("[GA] time_on_page event sent:", {
            timeOnPage,
            path: location.pathname,
          });
        } catch (error) {
          console.error("[GA] Failed to send time_on_page event:", error);
        }
      }
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick);
    window.addEventListener("beforeunload", handleUnload);

    eventListenersAdded.current = true;

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [location.pathname, gaCode]);

  return (
    <>
      <InternalTrafficWatermark />
      {children}
    </>
  );
}
