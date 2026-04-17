import Immutable from 'immutable'

const DO_SOMETHING = "DO_SOMETHING"


export const toggleDimension = (group, selection) => (dispatch, getState) => {
    const currentData = getState().getIn(['dc', group, 'data'])
    currentData.dimensions.forEach(dim => dim.code === selection ? dim.selected = !dim.selected : dim.selected)

    dispatch({type: "MODEL_UPDATED", group: group, data: currentData})
}


let initialState = Immutable.Map({})


export default (state = initialState, action) => {
    switch (action.type) {
        case DO_SOMETHING: {
            const {group} = action
            const newState = state.setIn(["my-example", 'status'], 'OK')
            return newState
        }

        default:
            return state
    }
}
