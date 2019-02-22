import {requests} from "../agent";
import {
    ADD_ERRORS_TO_NEW_POLICY_DIALOG,
    ADD_NEW_POLICY_REQUEST,
    GET_COMPANIES_RECEIVED,
    GET_COMPANIES_REQUEST,
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
} from "./constants";

import {showGrowl} from "./actions";
import {parseApiErrors} from "../apiUtils";
import {dashboardLoadPolicies, dashboardSetPoliciesFirstPage} from "./actionsDashboard";

export const getCompaniesRequest = () => {
    return {
        type: GET_COMPANIES_REQUEST
    }
};

export const getCompaniesReceived = (response) => {
    return {
        type: GET_COMPANIES_RECEIVED,
        companies: response['hydra:member']
    }
};

export const getCompanies = (searchValue) => {
    return (dispatch) => {
        dispatch(getCompaniesRequest());
        return requests.get(`/companies?name=${searchValue.query}`, true)
            .then(
            response => dispatch(getCompaniesReceived(response))
        ).catch(error => console.log(error));
    }
};

export const setCompanyValue = (companyValue) => {
    return {
        type: SET_COMPANY_VALUE,
        companyValue: companyValue.value
    }
};

export const setCompanyCode = (companyCode) => {
    return {
        type: SET_COMPANY_CODE,
        companyCode: companyCode
    }
};

export const setCompanyPeriod = (companyPeriod) => {
    return {
        type: SET_COMPANY_PERIOD,
        companyPeriod: companyPeriod
    }
};

export const setCompanyStartDate = (startDate) => {
    return {
        type: SET_COMPANY_STARTDATE,
        startDate: startDate
    }
};

export const setCompanyEndDate = (endDate) => {
    return {
        type: SET_COMPANY_ENDDATE,
        endDate: endDate
    }
};

export const setMainClientFirstname = (mainClientFirstname) => {
    return {
        type: SET_MAIN_CLIENT_FIRSTNAME,
        mainClientFirstname
    }
};

export const setMainClientLastname = (mainClientLastname) => {
    return {
        type: SET_MAIN_CLIENT_LASTNAME,
        mainClientLastname
    }
};

export const setMainClientPesel = (mainClientPesel) => {
    return {
        type: SET_MAIN_CLIENT_PESEL,
        mainClientPesel
    }
};

export const resetNewPolicyState = () => {
    return {
        type: RESET_NEW_POLICY_STATE,
    }
};

export const addNewPolicyRequest = () => {
    return {
        type: ADD_NEW_POLICY_REQUEST
    }
};

export const addNewPolicyReceived = (data) => {
    return {
        type: ADD_NEW_POLICY_REQUEST
    }
};

export const setNewPolicySelectedValue = (selectedValue) => {
    return {
        type: SET_NEW_POLICY_SELECTED_VALUE,
        selectedValue: selectedValue.value
    }
};


export const addErrorsToNewPolicyDialog = (errors) => {
    return {
        type: ADD_ERRORS_TO_NEW_POLICY_DIALOG,
        errors
    }
};

export const setVisibilityPolicyDialog = (value) => {
    return {
        type: SETTING_VISIBILITY_POLICY_DIALOG,
        value
    }
};

export const addNewPolicy = (code, startDate, endDate, period, companyId, clientFirstname, clientLastname, pesel, insuranceValue,policiesAmount) => (dispatch) => {
    dispatch(addNewPolicyRequest());
    return requests.post('/policywithmainclient',
        {
            "company": companyId,
            "code": code,
            "period": period,
            "startDate": startDate,
            "endDate": endDate,
            "clientFirstName": clientFirstname,
            "clientLastName": clientLastname,
            "pesel": pesel,
            "insuranceValue": insuranceValue
        }
    ).then(
        (response) => {
            dispatch(showGrowl({
                life: 4000,
                severity: 'success',
                summary: 'Policy has been added successfully',
                detail: `policy code: ${code}`
            }));
            const floorPage = Math.floor(policiesAmount/10);
            const page = floorPage + 1 ;
            const firstPage =  floorPage * 10;

            dispatch(addNewPolicyReceived(response));
            dispatch(dashboardLoadPolicies(page));
            dispatch(dashboardSetPoliciesFirstPage(firstPage));
            dispatch(setVisibilityPolicyDialog(false));
        })
        .catch(
            (error) => {
                dispatch(addErrorsToNewPolicyDialog(parseApiErrors(error)));
            });
};
