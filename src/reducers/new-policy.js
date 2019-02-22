import {
    ADD_ERRORS_TO_NEW_POLICY_DIALOG,
    GET_COMPANIES_RECEIVED,
    RESET_NEW_POLICY_STATE,
    SET_COMPANY_CODE,
    SET_COMPANY_ENDDATE,
    SET_COMPANY_PERIOD,
    SET_COMPANY_STARTDATE,
    SET_COMPANY_VALUE,
    SET_MAIN_CLIENT_FIRSTNAME,
    SET_MAIN_CLIENT_LASTNAME,
    SET_MAIN_CLIENT_PESEL,
    SET_NEW_POLICY_SELECTED_VALUE,
    SETTING_VISIBILITY_POLICY_DIALOG
} from "../actions/constants";

const tempDate = new Date();

const initialState = { companyValue: null,
    suggestedCompanies: null,
    companyCode: '',
    companyPeriod: '',
    startDate: new Date(),
    endDate: new Date(tempDate.getFullYear() + 1, tempDate.getMonth(), tempDate.getDate()),
    mainClientFirstname: '',
    mainClientLastname: '',
    mainClientPesel: '',
    selectedValue: null,
    errors: [],
    visibleNewPolicyDialog: false
};

export const newPolicy = (state =
                    {
                        ...initialState
                    },
                action) => {

    switch (action.type) {

        case GET_COMPANIES_RECEIVED:
            return {
              ...state,
                suggestedCompanies: action.companies
            };
        case SET_COMPANY_VALUE:
            return {
                ...state,
                companyValue: action.companyValue
            };
        case SET_COMPANY_CODE:
            return {
                ...state,
                companyCode: action.companyCode
            };
        case SET_COMPANY_PERIOD:
            return {
                ...state,
                companyPeriod: action.companyPeriod
            };
        case SET_COMPANY_STARTDATE:
            return {
                ...state,
                startDate: action.startDate
            };
        case SET_COMPANY_ENDDATE:
            return {
                ...state,
                endDate: action.endDate
            };
        case SET_MAIN_CLIENT_LASTNAME:
            return {
                ...state,
                mainClientLastname: action.mainClientLastname
            };
        case SET_MAIN_CLIENT_FIRSTNAME:
            return {
                ...state,
                mainClientFirstname: action.mainClientFirstname
            };
        case SET_MAIN_CLIENT_PESEL:
            return {
                ...state,
                mainClientPesel: action.mainClientPesel
            };
        case SET_NEW_POLICY_SELECTED_VALUE:
            return {
                ...state,
                selectedValue: action.selectedValue[0]
            };
        case ADD_ERRORS_TO_NEW_POLICY_DIALOG:
            return {
                ...state,
                errors: action.errors
            };

        case RESET_NEW_POLICY_STATE:
            return {
                ...state,
                ...initialState
            };
        case SETTING_VISIBILITY_POLICY_DIALOG:
            return {
                ...state,
                visibleNewPolicyDialog: action.value
            };

        default:
            return state;
    }
}
