import React, { useEffect } from 'react';
import ReactGA from "react-ga4";
import { useLocation } from 'react-router';
import { Config } from '../conf';
import { SettingsContext } from '@devgateway/wp-react-lib';


export interface WithGoogleAnalyticsProps {
    WrappedComponent: React.ComponentType<any>;
    options?: any;
}

export const withTracker = <T extends WithGoogleAnalyticsProps>(WrappedComponent: React.ComponentType<T>, options = {}) => {
    const HOC = (props: T) => {
        const settings = React.useContext(SettingsContext) ??  {};
        const gaCode = settings?.data?.google_analytics_code ?? Config.GA_CODE;
        console.log('gaCode', gaCode);
        const location = useLocation();

        ReactGA.initialize(gaCode ?? '#REACT_APP_GA_CODE#');


        useEffect(() => {
            if (gaCode) {
                const page = location.pathname;
                ReactGA.send({ hitType: "pageview", page });
            }

        }, [location.pathname]);


        return <WrappedComponent {...props} />;
    };

    return HOC;
};
