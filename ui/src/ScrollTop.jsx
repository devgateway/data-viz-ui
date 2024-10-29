import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopOnMount = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        window.setTimeout(() => window.scrollTo(0, 0), 200);
    }, [pathname]);

    return null;
};

export default ScrollToTopOnMount;
