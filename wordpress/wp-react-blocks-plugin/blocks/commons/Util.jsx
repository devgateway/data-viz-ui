export const togglePanel = (name,panelStatus, setAttributes) => {
    const newStatus = {...panelStatus}
    newStatus[name] = newStatus[name] == true ? false : true
    setAttributes({panelStatus: newStatus})
}


export default {togglePanel}