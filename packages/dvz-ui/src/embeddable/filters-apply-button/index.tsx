import React, {useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {Button, Container, Icon} from "semantic-ui-react";
import {applyFilter} from "../reducers/data";


const FiltersResetComponent = (props) => {
    const {
        editing = false,
        "data-group": group,
        onApply,
        "data-app": app = "csv",
        "data-label": label = "Apply",
        filters,
        initialFilters,
        apply

    } = props


    const [enabled, setEnabled] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState(initialFilters)

    
    const filtersChanged = (filters, selectedFilters) => {    
        for (let k in selectedFilters) {
            if (filters[k].length !== selectedFilters[k].length) {
                return true;
            }
            for (let i = 0; i < filters[k].length; i++) {                
                if (filters[k][i] !== selectedFilters[k][i]) {
                    return true;
                }
            }
        }

        return false;        
    }

    useEffect(() => {   
       const changed = filtersChanged(filters, selectedFilters); 
       if (changed) {
           setEnabled(changed);           
        }
        setSelectedFilters(filters)
       
    }, [filters])

    useEffect(() => {
        if (apply != null) {
            setEnabled(false);
        }
    }, [apply])


    return (
        <Container fluid={true}
                   className={`data-filters-apply ignore ${enabled ? '' : "disabled"} ${editing ? 'editing' : ''}`}
                   onClick={e => {
                       if (enabled) {
                           onApply({app, group})
                       }
                   }}>

            <span>{label}</span>
            <span><Icon name="chevron circle right" className="custom-apply-icon"/></span>

        </Container>
    );
};


const mapStateToProps = (state, ownProps) => {
    const {
        "data-group": group,
        "data-app": app = "csv",
    } = ownProps


    return {
        apply: state.getIn(['data', 'filters-settings', app, group, "apply"]),
        filters: state.getIn(['data', 'filters', app, group]) ? state.getIn(['data', 'filters', app, group]).toJS() : {},
        initialFilters: state.getIn(['data', 'filters', 'initial', app, group]) ? state.getIn(['data', 'filters', 'initial', app, group]).toJS() : {}
    }
}
const mapActionCreators = {
    onApply: applyFilter,

};

export default connect(mapStateToProps, mapActionCreators)(FiltersResetComponent)