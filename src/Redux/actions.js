import {
    USER_LOGGING_IN,
    USER_LOGGING_OUT,
    CURRENT_USER_UID,
    CURRENT_USER_NAME,
    CURRENT_USER_EMAIL,
    DATA_FOR_TODAY_CREATED
} from "./constants";

export const userLoggingIn = (token) => ({
    type: USER_LOGGING_IN,
    payload: token
})

export const userLoggingOut = () => ({
    type: USER_LOGGING_OUT,
})

export const currentUserUid = (uid) => ({
    type: CURRENT_USER_UID,
    payload: uid
})

export const currentUserName = (userName) => ({
    type: CURRENT_USER_NAME,
    payload: userName
})

export const currentUserEmail = (email) => ({
    type: CURRENT_USER_EMAIL,
    payload: email
})
