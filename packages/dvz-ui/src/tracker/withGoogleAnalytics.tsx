import React, { useEffect, useRef } from 'react';
import ReactGA from "react-ga4";
import { useLocation } from 'react-router';
import { Config } from '../conf';
import { SettingsContext } from '@devgateway/wp-react-lib';
import { isInternalTrafficEnabled } from './internalTrafficUtils';

export interface WithGoogleAnalyticsProps {
    WrappedComponent: React.ComponentType<any>;
    options?: any;
}

// Module-level tracking for GA initialization (not using useRef to avoid SSR issues)
const initializedGACodes = new Set<string>();

export const withTracker = <T extends WithGoogleAnalyticsProps>(WrappedComponent: React.ComponentType<T>, options = {}) => {
    const HOC = (props: T) => {
        const settings = React.useContext(SettingsContext) ??  {};
        const gaCode = settings?.data?.google_analytics_code ?? Config.GA_CODE;
        const location = useLocation();
        const hasInitialized = useRef(false);

        // Initialize GA only once per unique GA code
        useEffect(() => {
            if (gaCode && gaCode !== '#REACT_APP_GA_CODE#' && !hasInitialized.current) {
                if (!initializedGACodes.has(gaCode)) {
                    ReactGA.initialize(gaCode);
                    initializedGACodes.add(gaCode);
                    console.log('GA initialized with code:', gaCode);
                }
                hasInitialized.current = true;
            }
        }, [gaCode]);

        // Send pageview with traffic_type on route change
        useEffect(() => {
            if (gaCode && gaCode !== '#REACT_APP_GA_CODE#' && hasInitialized.current) {
                const page = location.pathname;
                const trafficType = isInternalTrafficEnabled() ? 'internal' : 'external';

                ReactGA.send({
                    hitType: "pageview",
                    page,
                    traffic_type: trafficType
                });

                console.log('GA pageview sent:', { page, traffic_type: trafficType });
            }
        }, [location.pathname, gaCode]);

        return <WrappedComponent {...props} />;
    };

    return HOC;
};
