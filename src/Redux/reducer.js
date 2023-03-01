import {
    USER_LOGGING_IN,
    USER_LOGGING_OUT,
    CURRENT_USER_AUTH
} from "./constants";


const initalState = {
    token: null,
    dataForToday: null,
    currentUserAuth: null
}

const reducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case USER_LOGGING_IN:
            return {
                ...state,
                token: payload
            }
        case USER_LOGGING_OUT:
            return {
                ...state,
                token: null,
                currentUserAuth: null
            }
        case CURRENT_USER_AUTH:
            return {
                ...state,
                currentUserAuth: payload
            }
        default:
            return state
    }
}

export default reducer