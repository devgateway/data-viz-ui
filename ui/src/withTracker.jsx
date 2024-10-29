import React from 'react';

import ReactGA from "react-ga4";
import { useLocation } from 'react-router-dom';



ReactGA.initialize('#REACT_APP_GA_CODE#');


const withTracker = (WrappedComponent, options = {}) => {
    const HOC = (props) => {
        const location = useLocation();

        // useEffect(() => {
        //     const page = location.pathname;
        //     ReactGA.send({ hitType: "pageview", page });
        // }, [location.pathname]);

        
        return <WrappedComponent {...props} />;
    };

    return HOC;
};

export default withTracker;
