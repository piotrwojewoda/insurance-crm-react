import {
    NAV_CHANGE_PAGE,
    NAV_RESET_TAB,
    NAV_TAB_CHANGE,
    REMOVE_MESSAGE,
    RESET_DASHBOARD_DATA,
    SET_USER_TOKEN,
    SHOW_MESSAGE,
    USER_LOGIN_ERROR,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_PROFILE_ERROR,
    USER_PROFILE_RECEIVED,
    USER_PROFILE_REQUEST,
    USER_SET_ID
} from "./constants";
import { push } from 'connected-react-router'
import {SubmissionError} from "redux-form";
import {requests} from "../agent";

export const navTabChange = (e) => {
    return {
        type: NAV_TAB_CHANGE,
        activeItem: e.value
    }
};

export const navResetTab = () => {
    return {
        type: NAV_RESET_TAB
    }
};

export const navChangePage = (page) => (dispatch) => {
    dispatch(push(page));
return {
    type: NAV_CHANGE_PAGE,
    page
}};

export const logout = () => (dispatch) => {
    dispatch(userLogout());
    dispatch(navChangePage('/login'));

};

export const userLogout = ()  => {
    return {
        type: USER_LOGOUT
    }
};

export const resetState = () => {
    return {
        type: RESET_DASHBOARD_DATA
    }
}



export const userLoginRequest = () => {
    return {
        type: USER_LOGIN_REQUEST
    }
};

export const userLoginError = () => {
    return {
        type: USER_LOGIN_ERROR
    }
}


export const userLoginAttempt = (username,password) => {
    return (dispatch) => {
        dispatch(userLoginRequest());
        return requests.post('/login_check', {username,password}, false).then(
            response => dispatch(userLoginSuccess(response.token,response.id))
        ).catch(error => {
            dispatch(userLoginError());
            throw new SubmissionError({
                    _error: 'Username or password is incorrect'
                }
            )
        });
    }
};

export const userLoginSuccess = (token,userId) => {
    return {
        type: USER_LOGIN_SUCCESS,
        token,
        userId
    }
};

export const userProfileFetch = (userId) => {
    return (dispatch) => {
        dispatch(userProfileRequest());
        return requests.get(`/users/${userId}`,true).then(
            response => dispatch(userProfileReceived(userId,response))
        )
            .catch(error => dispatch(userProfileError(userId)))
    }
};

export const userProfileRequest = () => {
    return {
        type: USER_PROFILE_REQUEST
    }
};

export const userProfileError = (userId) => {
    return {
        type: USER_PROFILE_ERROR,
        userId
    }
};

export const userProfileReceived = (userId,userData) => {
    return {
        type: USER_PROFILE_RECEIVED,
        userData,
        userId
    }
};

export const userSetId = (userId) => {
    return {
        type: USER_SET_ID,
        userId
    }
};


export const userSetToken = (jwtToken) => {
    return {
        type: SET_USER_TOKEN,
        jwtToken
    }
};

export const showMessage = (message) => ({
    type: SHOW_MESSAGE,
    message: message
});

export function showGrowl(message) {
    console.log(message);
    return showMessage(message);
}

export const removeMessages = () => ({
    type: REMOVE_MESSAGE,
});
