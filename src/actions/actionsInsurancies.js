import {requests} from "../agent";
import {
    GET_INSURANCE_CATEGORIES_RECEIVED,
    GET_INSURANCE_CATEGORIES_REQUEST,
    GET_INSURANCE_TYPES_RECEIVED,
    GET_INSURANCE_TYPES_REQUEST, GET_INSURANCE_VALUES_RECEIVED, GET_INSURANCE_VALUES_REQUEST
} from "./constants";

export const insuranciesLoadTypesRequest = () => {
    return {
        type: GET_INSURANCE_TYPES_REQUEST
    }
};

export const insuranciesLoadTypesReceived = (data) => {
    return {
        type: GET_INSURANCE_TYPES_RECEIVED,
        data
    }
};

export const insuranciesLoadTypes = () => {
    return (dispatch) => {
        dispatch(insuranciesLoadTypesRequest());
        return requests.get(`/insurance_types`,false).then(
            response => dispatch(insuranciesLoadTypesReceived(response))
        ).catch(error => console.log(error));
    }
};


export const insuranciesLoadCategoriesRequest = () => {
    return {
        type: GET_INSURANCE_CATEGORIES_REQUEST
    }
};

export const insuranciesLoadCategoriesReceived = (data) => {
    return {
        type: GET_INSURANCE_CATEGORIES_RECEIVED,
        data
    }
};

export const insuranciesLoadCategories = () => {
    return (dispatch) => {
        dispatch(insuranciesLoadCategoriesRequest());
        return requests.get(`/insurance_categories`,false).then(
            response => dispatch(insuranciesLoadCategoriesReceived(response))
        ).catch(error => console.log(error));
    }
};



export const insuranciesValuesRequest = () => {
    return {
        type: GET_INSURANCE_VALUES_REQUEST
    }
};

export const insuranciesValuesReceived = (data) => {
    return {
        type: GET_INSURANCE_VALUES_RECEIVED,
        data
    }
};




export const insurancesLoadValues = () => {
    return (dispatch) => {
        dispatch(insuranciesValuesRequest());
        return requests.get(`/insurance_values`,false).then(
            response => dispatch(insuranciesValuesReceived(response))
        ).catch(error => console.log(error));
    }

}
