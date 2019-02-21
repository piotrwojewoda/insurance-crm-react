import {requests} from "../agent";
import {
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
    SET_NEW_POLICY_SELECTED_VALUE
} from "./constants";

import { showGrowl } from "./actions";


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
        return requests.get(`/companies?name=${searchValue.query}`,true).then(
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
    return{
        type: SET_COMPANY_PERIOD,
        companyPeriod: companyPeriod
    }
};

export const setCompanyStartDate = (startDate) => {
    return{
        type: SET_COMPANY_STARTDATE,
        startDate: startDate
    }
};

export const setCompanyEndDate = (endDate) => {
    return{
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
    return{
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
    console.log('akcja');
    return {
        type: SET_NEW_POLICY_SELECTED_VALUE,
        selectedValue: selectedValue.value
    }
};

export const addNewPolicy = (code,startDate,endDate,period,companyId,clientFirstname,clientLastname,pesel,insuranceValue) => (dispatch) => {

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
        (response) =>{
            alert('aaaa');
            dispatch(showGrowl({ life: 4000, severity: 'success', summary: 'Policy has been added successfully', detail: `policy code: ${code}` }));
            dispatch(addNewPolicyReceived(response))

        })
        .catch( (error) => { console.log(error)});

};
