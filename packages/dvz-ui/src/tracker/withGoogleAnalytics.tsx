import React, { useEffect, useRef } from 'react';
import ReactGA from "react-ga4";
import { useLocation } from 'react-router';
import { Config } from '../conf';
import { SettingsContext } from '@devgateway/wp-react-lib';
import { isInternalTrafficEnabled } from './internalTrafficUtils';

// Module-level tracking for GA initialization - ensures GA is only initialized once globally
const initializedGACodes = new Set<string>();
let gaInitialized = false;

export const withTracker = <P extends Record<string, any> = {}>(
  WrappedComponent: React.ComponentType<P>
): React.ComponentType<P> => {
  const HOC = (props: P) => {
    const settings = React.useContext(SettingsContext) ?? {};
    const gaCode = settings?.data?.google_analytics_code ?? Config.GA_CODE;
    const location = useLocation();
    const lastSentPage = useRef<string | null>(null);
    const scrollTracked = useRef<boolean>(false);
    const eventListenersAdded = useRef<boolean>(false);

    // Initialize GA only once globally (client-side only)
    if (typeof window !== 'undefined' && !gaInitialized && gaCode && gaCode !== '#REACT_APP_GA_CODE#') {
      if (!initializedGACodes.has(gaCode)) {
        try {
          ReactGA.initialize(gaCode);
          initializedGACodes.add(gaCode);
          console.log('GA initialized with code:', gaCode);
        } catch (error) {
          console.error('Failed to initialize GA:', error);
        }
      }
      gaInitialized = true;
    }

    // Send pageview only when pathname changes
    useEffect(() => {
      if (typeof window === 'undefined') return;
      if (!gaCode || gaCode === '#REACT_APP_GA_CODE#') return;
      if (!gaInitialized) return;

      const page = location.pathname;

      // Only send if this is a different page than last time
      if (lastSentPage.current === page) {
        return;
      }

      lastSentPage.current = page;
      scrollTracked.current = false; // Reset scroll tracking for new page

      try {
        const trafficType = isInternalTrafficEnabled() ? 'internal' : 'external';

        ReactGA.event('page_view', {
          page_path: page,
          traffic_type: trafficType
        });

        console.log('GA pageview sent:', { page, traffic_type: trafficType });
      } catch (error) {
        console.error('Failed to send pageview:', error);
      }
    }, [location.pathname, gaCode]);

    // Track user interactions (scroll, click, etc.)
    useEffect(() => {
      if (typeof window === 'undefined') return;
      if (!gaCode || gaCode === '#REACT_APP_GA_CODE#') return;
      if (!gaInitialized) return;
      if (eventListenersAdded.current) return;

      const trafficType = isInternalTrafficEnabled() ? 'internal' : 'external';

      // Track scroll events
      const handleScroll = () => {
        if (scrollTracked.current) return;

        // Calculate scroll depth
        const scrollPercentage = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );

        // Only track meaningful scroll (more than 10%)
        if (scrollPercentage > 10) {
          try {
            ReactGA.event('scroll', {
              engagement_type: 'scroll',
              scroll_depth: scrollPercentage,
              traffic_type: trafficType,
            });
            console.log('GA scroll event sent:', { scrollPercentage, traffic_type: trafficType });
            scrollTracked.current = true;
          } catch (error) {
            console.error('Failed to send scroll event:', error);
          }
        }
      };

      // Track click events
      const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        // Get element text or id or class for identification
        const elementText = target.textContent?.substring(0, 50) || '';
        const elementId = target.id || '';
        const elementClass = target.className || '';

        // Only track if element has meaningful content
        if (!elementText && !elementId && !elementClass) return;

        try {
          ReactGA.event('element_click', {
            element_id: elementId,
            element_class: elementClass,
            element_text: elementText.substring(0, 50),
            traffic_type: trafficType,
          });
        } catch (error) {
          // Silently fail for click tracking to avoid spam
        }
      };

      // Track time on page
      const startTime = Date.now();
      const handleUnload = () => {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);

        if (timeOnPage > 3) { // Only track if spent more than 3 seconds
          try {
            ReactGA.event('time_on_page', {
              page_path: location.pathname,
              duration_seconds: timeOnPage,
              traffic_type: trafficType,
            });
            console.log('GA time_on_page event sent:', { timeOnPage, path: location.pathname });
          } catch (error) {
            console.error('Failed to send time_on_page event:', error);
          }
        }
      };

      // Add event listeners
      window.addEventListener('scroll', handleScroll, { passive: true });
      document.addEventListener('click', handleClick);
      window.addEventListener('beforeunload', handleUnload);

      eventListenersAdded.current = true;

      // Cleanup
      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('click', handleClick);
        window.removeEventListener('beforeunload', handleUnload);
      };
    }, [location.pathname, gaCode]);

    return <WrappedComponent {...props} />;
  };

  HOC.displayName = `withTracker(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return HOC as React.ComponentType<P>;
};
