import React from 'react';
import {connect} from "react-redux";
import {Container, Icon} from "semantic-ui-react";
import {cleanFilter} from "../reducers/data";


const FiltersResetComponent = (props) => {
    const {
        appliedFilters,
        initialFilters,
        "data-group": group,
        onClean,
        "data-app": app = "csv",
        "data-reset-label": resetLabel = "Reset All Filters"
    } = props

    let enabled = false;

    

    //TODO: Check why we are using Number.MIN_SAFE_INTEGER instead of an empty array
    Object.keys(initialFilters).forEach(k=>{
        if (initialFilters[k].length!=appliedFilters[k].filter(v=>v!=Number.MIN_SAFE_INTEGER).length){
            enabled=true
        }
    })



    return (<Container fluid={true} className={`data-filters-reset ignore ${enabled ? '' : "disabled"}`} onClick={e => onClean({app, group})}>
        <span>{resetLabel}</span>
        <span><Icon name="undo alternate" className="custom-undo-icon"/></span>
    </Container>);
};


const mapStateToProps = (state, ownProps) => {
    const {
        "data-group": group,
        "data-app": app = "csv",
    } = ownProps


    return {
        appliedFilters: state.getIn(['data', 'filters', app, group])?state.getIn(['data', 'filters', app, group]).toJS():{},
        initialFilters: state.getIn(['data', 'filters', 'initial', app, group])? state.getIn(['data', 'filters', 'initial', app, group]).toJS():{},
    }
}
const mapActionCreators = {
    onClean: cleanFilter
};

export default connect(mapStateToProps, mapActionCreators)(FiltersResetComponent)