import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { cleanMeasures, setMeasures } from "../reducers/data";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

interface MeasuresProps {
    parent?: string,
    editing?: boolean,
    unique?: string,
    "data-label"?: string,
    "data-group": string,
    "data-app": string,
    "data-measures-groups"?: any
}

const Measures: React.FC<MeasuresProps> = (props) => {
    const {
        parent,
        editing = false,
        unique,
        "data-label": label,
        "data-group": group,
        "data-app": app,
        "data-measures-groups": dataGroups
    } = props;
    
    let groups

    const dispatch = useAppDispatch();
    const selected = useAppSelector(state => state.getIn(['data', 'measures', app, group])) as Record<string, any>;

    const actions = {
        onReset: cleanMeasures,
        onChange: setMeasures
    }

    if (dataGroups instanceof String || typeof (dataGroups) == 'string') {
        groups = JSON.parse(decodeURIComponent(dataGroups as string));
    } else {
        groups = dataGroups
    }



    useEffect(() => {
        if (groups && groups[app]) {
            groups[app].forEach(g => {
                if (g.defaultSelected) {
                    dispatch(actions.onChange({ app, group, mGroup: g }));
                }
            })

        }

    }, [])

    if (groups && groups[app]) {
        const items = groups[app];
        return <Container className={"measures group"} fluid>
            {label && <span>{label}</span>}
            {items.map(i => {
                return (<div key={i.idx} className={"inputs lists"} onClick={e => dispatch(actions.onChange({ app, group, mGroup: i }))}>
                    <input readOnly checked={(selected && selected.idx == i.idx) ? true : false}
                        type="radio" />
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


export default Measures;