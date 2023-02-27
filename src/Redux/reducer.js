import {
    USER_LOGGING_IN,
    USER_LOGGING_OUT,
    CURRENT_USER_UID,
    CURRENT_USER_NAME,
    CURRENT_USER_EMAIL,
    CURRENT_USER_AUTH
} from "./constants";


const initalState = {
    token: null,
    currentUserUid: null,
    currentUserName: null,
    currentUserEmail: null,
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
                currentUserUid: null,
                currentUserName: null,
                currentUserEmail: null
            }
        case CURRENT_USER_UID:
            return {
                ...state,
                currentUserUid: payload
            }
        case CURRENT_USER_NAME:
            return {
                ...state,
                currentUserName: payload
            }
        case CURRENT_USER_EMAIL:
            return {
                ...state,
                currentUserEmail: payload
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