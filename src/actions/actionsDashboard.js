import {
    DASHBOARD_LOAD_POLICIES_RECEIVED,
    DASHBOARD_LOAD_POLICIES_REQUEST
} from "./constants";
import {requests} from "../agent";



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

}


export const dashboardLoadPolicies = () => {

    return (dispatch) => {
        dispatch(dashboardPoliciesRequest);
        return requests.get('/policies',true).then(
            response => dispatch(dashboardPoliciesReceived(response))
        ).catch(error => console.log(error));
    }



};
