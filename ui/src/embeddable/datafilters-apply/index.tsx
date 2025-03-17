import React, {useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {Button, Container, Icon} from "semantic-ui-react";
import {applyFilter} from "../reducers/data";


const FiltersResetComponent = (props) => {
    const {
        editing = false,
        appliedFilters,
        "data-group": group,
        onApply,
        "data-app": app = "csv",
        "data-label": label = "Apply"
    } = props


    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const [enabled, setEnabled] = useState(false)
    const prevFilters = usePrevious(appliedFilters);

    useEffect(() => {

        debugger; //eslint-disable-line
        if (prevFilters) {
            Object.keys(prevFilters).forEach(k => {
                if (prevFilters[k].length != appliedFilters[k].filter(v => v != Number.MIN_SAFE_INTEGER).length) {
                    setEnabled(true)
                }
            });
        }
    }, [appliedFilters])


    return (
        <Container fluid={true}
                   className={`data-filters-apply ignore ${enabled ? '' : "disabled"} ${editing ? 'editing' : ''}`}
                   onClick={e => onApply({app, group})}>
            <span><Icon name="chevron circle right" className="custom-apply-icon"/></span>
            <span>{label}</span>
        </Container>
    );
};


const mapStateToProps = (state, ownProps) => {
    const {
        "data-group": group,
        "data-app": app = "csv",
    } = ownProps


    return {
        appliedFilters: state.getIn(['data', 'filters', app, group]) ? state.getIn(['data', 'filters', app, group]).toJS() : {},
        initialFilters: state.getIn(['data', 'filters', 'initial', app, group]) ? state.getIn(['data', 'filters', 'initial', app, group]).toJS() : {},
    }
}
const mapActionCreators = {
    onApply: applyFilter
};

export default connect(mapStateToProps, mapActionCreators)(FiltersResetComponent)