import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Container, Icon } from "semantic-ui-react";
import { cleanFilter } from "../reducers/data";


const FiltersResetComponent = (props) => {
    const {
        appliedFilters,
        initialFilters,
        "data-group": group,
        onClean,
        "data-app": app = "csv",
        "data-reset-label": resetLabel = "Reset All Filters"
    } = props


    const enabled = React.useMemo(() => {
        return Object.keys(initialFilters).some(k => {
            const initialValues = initialFilters[k];
            const appliedValues = appliedFilters[k] || [];
            const filteredApplied = appliedValues.filter(v => v !== Number.MIN_SAFE_INTEGER);

            if (filteredApplied.length === 0) {
                return false;
            }

            // If initial value is MIN_SAFE_INTEGER and we have a single applied filter, enable reset
            if (initialValues.length === 1 && 
                initialValues[0] === Number.MIN_SAFE_INTEGER && 
                filteredApplied.length > 0) {
                return true;
            }
            
            // Check if arrays have different lengths or different values
            const res = initialValues.length !== filteredApplied.length && 
                !initialValues.every(v => filteredApplied.includes(v));
            console.log("res", res)
            return res;
        });
    }, [initialFilters, appliedFilters]);



    return (
        <Container fluid={true} className={`data-filters-reset ignore ${enabled ? '' : "disabled"}`} onClick={e => onClean({ app, group })}>
            <span>{resetLabel}</span>
            <span><Icon name="undo alternate" className="custom-undo-icon" /></span>
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
    onClean: cleanFilter
};

export default connect(mapStateToProps, mapActionCreators)(FiltersResetComponent)