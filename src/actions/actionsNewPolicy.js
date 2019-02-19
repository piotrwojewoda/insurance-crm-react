import {requests} from "../agent";
import {GET_COMPANIES_RECEIVED, GET_COMPANIES_REQUEST, SET_COMPANY_VALUE} from "./constants";


export const getCompaniesRequest = () => {
    return {
        type: GET_COMPANIES_REQUEST
    }
};

export const getCompaniesReceived = (response) => {
    console.log('requuuest',response);
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
}
