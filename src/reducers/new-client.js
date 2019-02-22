import {
    ADD_ERRORS_TO_NEW_CLIENT_DIALOG,
    NEW_CLIENT_SET_CLIENT_FIRSTNAME, NEW_CLIENT_SET_CLIENT_LASTNAME, NEW_CLIENT_SET_CLIENT_PESEL,
    NEW_CLIENT_SET_SELECTED_VALUE,
    RESET_NEW_CLIENT_STATE, SETTING_VISIBILITY_CLIENT_DIALOG,
} from "../actions/constants";

const initialState = {
    clientFirstname: '',
    clientLastname: '',
    clientPesel: '',
    selectedValue: null,
    visibleNewClientDialog: false,
    errors: [],
};

export const newClient = (state =
                              {
                                  ...initialState
                              },
                          action) => {

    switch (action.type) {
        case NEW_CLIENT_SET_CLIENT_FIRSTNAME:
            return {
                ...state,
                clientFirstname: action.clientFirstname
            };
        case NEW_CLIENT_SET_CLIENT_LASTNAME:
            return {
                ...state,
                clientLastname: action.clientLastname
            };
        case NEW_CLIENT_SET_CLIENT_PESEL:
            return {
                ...state,
                clientPesel: action.clientPesel
            };
        case NEW_CLIENT_SET_SELECTED_VALUE:
            return {
                ...state,
                selectedValue: action.selectedValue[0]
            };
        case RESET_NEW_CLIENT_STATE:
            return {
                ...state,
                ...initialState
            };
        case SETTING_VISIBILITY_CLIENT_DIALOG:
            return {
                ...state,
                visibleNewClientDialog: action.value
            };
        case ADD_ERRORS_TO_NEW_CLIENT_DIALOG:
            return {
                ...state,
                errors: action.errors
            };

        default:
            return state;
    }
};
