import React, {useEffect} from "react";
import {Container, Label} from "semantic-ui-react";
import {connect} from "react-redux";
import {cleanMeasures, setMeasures} from "../reducers/data";

const Measures = (props) => {
    const {
        parent,
        editing = false,
        unique,
        selected,
        onChange,
        "data-label": label,
        "data-group": group,
        "data-app": app,
        "data-measures-groups": dataGroups

    } = props
    let groups

    
    if (dataGroups instanceof String || typeof (dataGroups) == 'string') {
        groups = JSON.parse(decodeURIComponent(dataGroups));
    } else {
        groups = dataGroups
    }



    useEffect(() => {
        if (groups && groups[app]) {
            groups[app].forEach(g => {
                if (g.defaultSelected) {
                    onChange({app, group, mGroup: g})
                }
            })

        }

    }, [])

    if (groups && groups[app]) {
        const items = groups[app];
        return <Container className={"measures group"} fluid>
            {label && <span>{label}</span>}
            {items.map(i => {
                return (<div className={"inputs lists"} onClick={e => onChange({app, group, mGroup: i})}>
                    <input checked={(selected && selected.idx == i.idx) ? true : false}
                           type="radio"/>
                     <span>{i.label}</span>
                </div>)
            })}
        </Container>
    } else {
        return <Container className={"measures group"} fluid>
            {label && <span>{label}</span>}
        </Container>
    }

    return null

}

const mapStateToProps = (state, ownProps) => {
    const {"data-app": app, "data-group": group,} = ownProps
    
    return {
        selected: state.getIn(['data', 'measures', app, group]),
    }
}

const mapActionCreators = {
    onReset: cleanMeasures,
    onChange: setMeasures
};

export default connect(mapStateToProps, mapActionCreators)(Measures)