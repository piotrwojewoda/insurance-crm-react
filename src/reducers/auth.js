import {
    SET_USER_TOKEN,
    USER_LOGIN_ERROR,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_PROFILE_RECEIVED,
    USER_SET_ID
} from "../actions/constants";

export default (state =
                    {
                        token: null,
                        userId: null,
                        isAuthenticated: false,
                        userData: null,
                        spinner: false
                    },
                action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                isAuthenticated: true,
                spinner: false
            };
        case USER_SET_ID:
            return {
                ...state,
                userId: action.userId,
                isAuthenticated: true
            };
        case SET_USER_TOKEN:
            return {
                ...state,
                token: action.jwtToken
            };
        case USER_PROFILE_RECEIVED:

            return {
                ...state,
                spinner: false,
                userData: (state.userId === action.userId && state.userData === null)
                    ? action.userData : state.userData,
                isAuthenticated: (state.userId === action.userId && state.userData === null)
            };

        case USER_LOGOUT:
            return {
                ...state,
                spinner: false,
                token: null,
                userId: null,
                isAuthenticated: false,
                userData: null
            };
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                spinner: true

            }
        case USER_LOGIN_ERROR:
            return {
                ...state,
                spinner: false
            };
        default:
            return state;
    }
}
