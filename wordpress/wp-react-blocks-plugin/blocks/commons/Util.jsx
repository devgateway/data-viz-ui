export const togglePanel = (name,panelStatus, setAttributes) => {
    const newStatus = {...panelStatus}
    newStatus[name] = newStatus[name] == true ? false : true
    setAttributes({panelStatus: newStatus})
}

export const panelFocus = (name) => {
    const newStatus = {...panelStatus}
    newStatus[name] = newStatus[name] == true ? false : true
    setAttributes({panelFocus: newStatus})
}

export default {togglePanel}