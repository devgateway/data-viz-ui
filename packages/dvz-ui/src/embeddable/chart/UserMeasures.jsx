import React from "react";

const UserMeasures = ({
    options,
    data,
    label = "View data by:",
    multiMeasure,
    userMeasures = [],
    currentMeasures = [],
    onMeasureChange,
    measuresObject
}) => {


    const metadataMeasures = data?.metadata?.measures || options?.metadata?.measures || [];
    const getMeasureLabel = (measure) => {
        const configuredMeasure = measuresObject?.[measure] || {};
        const metadataLabel = metadataMeasures.find((item) => item.value == measure)?.label;

        return configuredMeasure.overrrideMeasureLabel
            || configuredMeasure.overrideMeasureLabel
            || configuredMeasure.customLabel
            || metadataLabel
            || measure;
    }

    return <div className={"measures"}>
        {label && <div className="label-item"><label>{label}</label></div>}
        {measuresObject && userMeasures.map(u => {

            if (multiMeasure) {
                return (<div key={u} onClick={e => onMeasureChange(u)}>
                    <div className={`measure item  ${currentMeasures.indexOf(u) > -1 ? 'active' : ''}`}>
                        {getMeasureLabel(u)}
                    </div></div>)
            } else {
                return (<div key={u} className={`item single-select`} onClick={e => onMeasureChange(u)}>
                    <label>
                        <input checked={currentMeasures.indexOf(u) > -1}
                            readOnly
                            type="radio"
                            value={getMeasureLabel(u)} />
                    </label>
                    <label > {getMeasureLabel(u)}</label>
                </div>)
            }

        }
        )
        }
    </div>
}


export default UserMeasures