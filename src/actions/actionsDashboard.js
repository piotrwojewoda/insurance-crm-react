import {
    DASHBOARD_LOAD_CLIENT_RECEIVED,
    DASHBOARD_LOAD_CLIENT_REQUEST,
    DASHBOARD_LOAD_POLICIES_RECEIVED,
    DASHBOARD_LOAD_POLICIES_REQUEST,
    DASHBOARD_LOAD_POLICY_ITEM_RECEIVED,
    DASHBOARD_LOAD_POLICY_ITEM_REQUEST, DASHBOARD_SELECT_CLIENT,
    DASHBOARD_SELECT_POLICY, DASHBOARD_SET_POLICIES_FIRST_PAGE
} from "./constants";
import {requests} from "../agent";
import {uriId} from "../apiUtils";




export const dashboardPoliciesRequest = () => {
    return {
        type: DASHBOARD_LOAD_POLICIES_REQUEST
    }
};

export const dashboardPoliciesReceived = (data) => {

    return {
        type: DASHBOARD_LOAD_POLICIES_RECEIVED,
        data
    }
};

export const dashboardLoadPolicies = (page = 1) => {      // wykonuje reπuest pobierający polisy
    return (dispatch) => {
        dispatch(dashboardPoliciesRequest());
        return requests.get(`/policies?_page=${page}`,true).then(
            response => dispatch(dashboardPoliciesReceived(response))
        ).catch(error => console.log(error));
    }
};

export const dashboardSelectPolicy = (policy) => (dispatch) => {
   dispatch(dashboardPutPolicyAsSelected(policy));
   dispatch(dashboardLoadPolicyItem(uriId(policy)));
};

export const dashboardPutPolicyAsSelected = (policy) => {
    return {
        type: DASHBOARD_SELECT_POLICY,
        policy
    }
};

export const dashboardLoadPolicyItem = (id) => {
    return (dispatch) => {
        dispatch(dashboardLoadPolicyItemRequest(id));
        return requests.get(`/policies/${id}`,true).then(
            response => dispatch(dashboardLoadPolicyItemReceived(response))
        ).catch(error => console.log(error));
    }
};
export const dashboardLoadPolicyItemRequest = () => {
    return {
        type: DASHBOARD_LOAD_POLICY_ITEM_REQUEST
    }
};

export const dashboardLoadPolicyItemReceived = (data) => {

    // console.log('datta',data);

    return {
        type: DASHBOARD_LOAD_POLICY_ITEM_RECEIVED,
        data
    }
};


export const dashboardSetPoliciesFirstPage = (page) => {
    return {
        type: DASHBOARD_SET_POLICIES_FIRST_PAGE,
        policiesFirstPage: page
    }
};

export const dashboardPutClientAsSelected = (client) => {
    return {
        type: DASHBOARD_SELECT_CLIENT,
        client
    }
};

export const dashboardSelectClient = (client) => (dispatch) => {
    dispatch(dashboardLoadClient(client));
   // dispatch(dashboardPutClientAsSelected(client));
};


export const dashboardLoadClientRequest = () => {
    return {
        type: DASHBOARD_LOAD_CLIENT_REQUEST
    }
};

export const dashboardLoadClientReceived = (data) => {
    return {
        type: DASHBOARD_LOAD_CLIENT_RECEIVED,
        data
    }
};

export const dashboardLoadClient = (client) => (dispatch) => {
        dispatch(dashboardLoadClientRequest());
        return requests.get(`/clients/${uriId(client)}`,true).then(
            response => dispatch(dashboardLoadClientReceived(response))
        ).catch(error => console.log(error));

};
