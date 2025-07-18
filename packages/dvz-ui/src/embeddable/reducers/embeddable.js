import Immutable from 'immutable'
import {sendShowCase, subscribe} from "./embeddable-api";

const SHOW_CASE_SEND = "SEND_SHOW_CASE"
const SHOW_CASE_SEND_DONE = "SEND_SHOW_CASE_DONE"
const SHOW_CASE_SEND_FAILURE = "SEND_SHOW_CASE_FAILURE"
const SHOW_CASE_RESET = "SHOW_CASE_RESET"

const NEWS_LETTER_SUBSCRIBE = "NEWS_LETTER_SUBSCRIBE"
const NEWS_LETTER_SUBSCRIBE_DONE = "NEWS_LETTER_SUBSCRIBE_DONE"
const NEWS_LETTER_SUBSCRIBE_FAILURE = "NEWS_LETTER_SUBSCRIBE_FAILURE"
const NEWS_LETTER_SET_EMAIL = "NEWS_LETTER_SET_EMAIL"


const CONTENT_LOADED = "POST_LOADED"

export const postLoaded = (params) => (dispatch, getState) => {
    dispatch({type:CONTENT_LOADED})
}

const initialState = Immutable.Map({})

export const setEmail = (eMail) => (dispatch, getState) => {
    dispatch({type:NEWS_LETTER_SET_EMAIL, eMail})
}



///////////////////////////////new///////////////////////////////////////////
export const newsletterSubscription = (params) => (dispatch, getState) => {
    dispatch({type: NEWS_LETTER_SUBSCRIBE})
    subscribe(params).then((res) => {
        if (res.status === 500) {
            dispatch({type: NEWS_LETTER_SUBSCRIBE_FAILURE})
        } else {
            dispatch({type: NEWS_LETTER_SUBSCRIBE_DONE})
        }
    }).catch((err) => {
        dispatch({type: NEWS_LETTER_SUBSCRIBE_FAILURE})
    })
}
///////////////////////////////new///////////////////////////////////////////


export const sendShowCaseForm = (params) => (dispatch, getState) => {
    dispatch({type: SHOW_CASE_SEND})

    sendShowCase(params).then((res) => {
        if (res.status === 500) {
            dispatch({type: SHOW_CASE_SEND_FAILURE})
        } else {
            dispatch({type: SHOW_CASE_SEND_DONE})
        }
    }).catch((err) => {
        dispatch({type: SHOW_CASE_SEND_FAILURE})
    })
}


export const reset = (params) => (dispatch, getState) => {
    dispatch({type: SHOW_CASE_RESET})
}


export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_CASE_SEND: {
            return state.setIn(['showCase', 'loading'], true)
                .setIn(['showCase', 'status'], null)
        }
        case SHOW_CASE_SEND_DONE: {
            return state.setIn(['showCase', 'status'], "OK")
        }
        case SHOW_CASE_SEND_FAILURE: {
            return state.setIn(['showCase', 'status'], "ERROR")
        }
        case SHOW_CASE_RESET: {
            return state.setIn(['showCase', 'status'], null)
        }

        case NEWS_LETTER_SUBSCRIBE: {
            return state.setIn(['newsletter', 'loading'], true)
                .setIn(['newsletter', 'status'], null)
        }
        case NEWS_LETTER_SUBSCRIBE_DONE: {
            return state.setIn(['newsletter', 'status'], "OK").setIn(['newsletter', 'email'],'')

        }
        case NEWS_LETTER_SUBSCRIBE_FAILURE: {
            return state.setIn(['newsletter', 'status'], "ERROR")
        }
        case NEWS_LETTER_SET_EMAIL: {
            const {eMail} = action
            
            return state.setIn(['newsletter', 'email'], eMail)
        }

        case CONTENT_LOADED: {
            return state.setIn(["random"],Math.random())
        }
        default:
            return state
    }
}
