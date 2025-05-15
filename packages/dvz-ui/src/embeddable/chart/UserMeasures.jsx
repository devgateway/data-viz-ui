import React from "react";

const UserMeasures = ({options, multiMeasure, userMeasures, currentMeasures = [], onMeasureChange, measuresObject}) => {


    console.log("multiMeasure:" + multiMeasure)
    return <div className={"measures"}>
        <div className="label-item"><label>View data by:</label></div>
        {measuresObject && userMeasures.map(u => {

            if (multiMeasure) {
                return (<div onClick={e => onMeasureChange(u)}>
                    <div className={`measure item  ${currentMeasures.indexOf(u) > -1 ? 'active' : ''}`}>
                        {measuresObject && measuresObject[u] && measuresObject[u].overrrideMeasureLabel ?
                            measuresObject[u].overrrideMeasureLabel :
                            (options.metadata ? options.metadata.measures.filter(f => f.value == u)[0].label : '')}
                    </div></div>)
            } else {
                return (<div className={`item single-select`} onClick={e => onMeasureChange(u)}>
                    <label>
                        <input checked={currentMeasures.indexOf(u) > -1}
                            type="radio"
                            value={measuresObject[u].overrrideMeasureLabel} />
                    </label>
                    <label > {measuresObject && measuresObject[u] && measuresObject[u].overrrideMeasureLabel ?
                        measuresObject[u].overrrideMeasureLabel :
                        (options.metadata ? options.metadata.measures.filter(f => f.value == u)[0].label : '')}</label>
                </div>)
            }

        }
        )
        }
    </div>
}


export default UserMeasures