import {
    DASHBOARD_LOAD_CLIENT_RECEIVED,
    DASHBOARD_LOAD_CLIENT_REQUEST,
    DASHBOARD_LOAD_POLICIES_RECEIVED,
    DASHBOARD_LOAD_POLICIES_REQUEST,
    DASHBOARD_LOAD_POLICY_ITEM_RECEIVED,
    DASHBOARD_LOAD_POLICY_ITEM_REQUEST,
    DASHBOARD_SELECT_CLIENT,
    DASHBOARD_SELECT_POLICY,
    DASHBOARD_SET_POLICIES_FIRST_PAGE,
    REMOVE_SELECTED_CLIENT,
    REMOVE_SELECTED_CLIENT_ERROR,
    REMOVE_SELECTED_POLICY,
    RESET_DASHBOARD_DATA,
    SELECTED_CLIENT_HAS_BEEN_REMOVED,
    SELECTED_POLICY_HAS_BEEN_REMOVED,
    SHOWING_GROWL_HAS_BEEN_REMOVED,
    SHOWING_GROWL_HAS_NOT_BEEN_REMOVED
} from "./constants";
import {requests} from "../agent";
import {apiObjectId, parseApiOperationErrors, uriId} from "../apiUtils";
import {navChangePage, showGrowl, userLogout} from "./actions";

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
        ).catch(error => {
            if (401 === error.response.status) {
                dispatch(dashboardResetData());
                dispatch(userLogout());
                return dispatch(navChangePage('/login'));
            }

        });
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
        ).catch(error => {
            if (401 === error.response.status) {
                dispatch(dashboardResetData());
                dispatch(userLogout());
              return dispatch(navChangePage('/login'));
            }
        });
    }
};
export const dashboardLoadPolicyItemRequest = () => {
    return {
        type: DASHBOARD_LOAD_POLICY_ITEM_REQUEST
    }
};

export const dashboardLoadPolicyItemReceived = (data) => {
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
        ).catch(error => {
            if (401 === error.response.status) {
                dispatch(dashboardResetData());
                dispatch(userLogout());
                return dispatch(navChangePage('/login'));
            }
        });
};

export const dashboardResetData = () => {
    return {
        type: RESET_DASHBOARD_DATA
    }
};

export const removeSelectedClient = () => {
    return {
        type: REMOVE_SELECTED_CLIENT
    }
};


export const startRemoveSelectedClient = (client) => (dispatch) => {
    dispatch(removeSelectedClient());
    return requests.delete(`/clients/${client.id}`, true).then(
        response => {
            dispatch(showGrowl({
                life: 2000,
                severity: 'success',
                summary: 'Selected client has been removed with success',
                detail: ''
            }));
            dispatch(
                (
                    () => {
                        return {
                            type: SELECTED_CLIENT_HAS_BEEN_REMOVED
                        }
                    }
                )()
            );
        }
    ).catch((error) => {
        dispatch(showGrowl({
            life: 2000,
            severity: 'error',
            summary: 'Client has not been removed',
            detail: parseApiOperationErrors(error)
        }));
        dispatch(
            (
                () => {
                    return {
                        type: REMOVE_SELECTED_CLIENT_ERROR,
                        error
                    };
                }
            )()
        );
    });
};

export const removeSelectedPolicy = () => {
        return {
            type: REMOVE_SELECTED_POLICY
        }
};

export const selectedPolicyHasBeenRemoved = () => (dispatch) => {
    dispatch(showGrowlPolicyHasBeenRemovedWithSuccess());
    return {
        type: SELECTED_POLICY_HAS_BEEN_REMOVED
    }
};

export const removingPolicyError = (error) => (dispatch) => {
    dispatch(showGrowlPolicyHasNotBeenRemoved(parseApiOperationErrors(error)));
};


export const showGrowlPolicyHasBeenRemovedWithSuccess = () => (dispatch) =>{
    dispatch(showGrowl({ life: 2000, severity: 'success', summary: 'Policy has been removed with success', detail: '' }));
    return {
        type: SHOWING_GROWL_HAS_BEEN_REMOVED
    }
};

export const showGrowlPolicyHasNotBeenRemoved = (error) => (dispatch) =>{
    dispatch(showGrowl({ life: 2000, severity: 'error', summary: 'Policy has not been removed', detail: error }));
    return {
        type: SHOWING_GROWL_HAS_NOT_BEEN_REMOVED
    }
};


export const startRemoveSelectedPolicy = (policy) => (dispatch) => {
    dispatch(removeSelectedPolicy());
    return requests.delete(`/policies/${apiObjectId(policy)}`,true).then(
        response => {
            dispatch(selectedPolicyHasBeenRemoved());
        }
    ).catch( (err) => {
           dispatch(removingPolicyError(err));
    });
};
