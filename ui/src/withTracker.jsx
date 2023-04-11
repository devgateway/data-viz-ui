import React, {Component} from 'react';

import ReactGA from "react-ga4";




ReactGA.initialize('#REACT_APP_GA_CODE#');

const withTracker = (WrappedComponent, options = {}) => {


    const HOC = class extends Component {
        componentDidMount() {

            const page = this.props.location.pathname;
            ReactGA.send({hitType: "pageview", page});

            //trackPage(page);
        }

        componentDidUpdate = prevPros => {
            const currentPage = prevPros.location.pathname;
            const nextPage = this.props.location.pathname;

            if (currentPage !== nextPage) {
                ReactGA.send({hitType: "pageview", page: nextPage});

            }
        };

        render() {

            return <WrappedComponent {...this.props} />;
        }
    };

    return HOC;
};

export default withTracker;
