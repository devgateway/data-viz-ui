import React, { useEffect } from 'react';
import ReactGA from "react-ga4";
import { useLocation } from 'react-router-dom';
import { Config } from './conf';


if (Config.GA_CODE || Config.GA_CODE !== '') ReactGA.initialize(Config.GA_CODE || '#REACT_APP_GA_CODE#');


const withTracker = (WrappedComponent, options = {}) => {
    const HOC = (props) => {
        const location = useLocation();

        useEffect(() => {
            if (Config.GA_CODE) {
                const page = location.pathname;
                ReactGA.send({ hitType: "pageview", page });
            }
           
        }, [location.pathname]);

        
        return <WrappedComponent {...props} />;
    };

    return HOC;
};

export default withTracker;