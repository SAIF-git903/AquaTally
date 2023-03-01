import {
    USER_LOGGING_IN,
    USER_LOGGING_OUT,
    CURRENT_USER_AUTH
} from "./constants";

export const userLoggingIn = (token) => ({
    type: USER_LOGGING_IN,
    payload: token
})

export const userLoggingOut = () => ({
    type: USER_LOGGING_OUT,
})

export const authCurrentUser = (auth_currentUser) => ({
    type: CURRENT_USER_AUTH,
    payload: auth_currentUser
})

