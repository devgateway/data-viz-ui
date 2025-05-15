import React, { useEffect } from 'react';
import ReactGA from "react-ga4";
import { useLocation } from 'react-router-dom';
import { Config } from '../../packages/dvz-ui/src/conf';
import { SettingsContext } from '@devgateway/wp-react-lib';


const withTracker = (WrappedComponent, options = {}) => {
    const HOC = (props) => {
        const settings = React.useContext(SettingsContext) ||  {};
        const gaCode = settings?.data?.google_analytics_code || Config.GA_CODE;
        console.log('gaCode', gaCode);
        const location = useLocation();

        ReactGA.initialize(gaCode || '#REACT_APP_GA_CODE#');


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

export default withTracker;