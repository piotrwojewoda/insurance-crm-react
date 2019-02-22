import {requests} from "../agent";
import {
    ADD_ERRORS_TO_NEW_CLIENT_DIALOG,
    NEW_CLIENT_SET_CLIENT_FIRSTNAME,
    NEW_CLIENT_SET_CLIENT_LASTNAME,
    NEW_CLIENT_SET_CLIENT_PESEL,
    NEW_CLIENT_SET_SELECTED_VALUE,
    RESET_NEW_CLIENT_STATE,
    SETTING_VISIBILITY_CLIENT_DIALOG,
} from "./constants";
import {showGrowl} from "./actions";
import {apiObjectId, parseApiErrors} from "../apiUtils";
import {dashboardLoadPolicyItem} from "./actionsDashboard";

export const newClientSetClientFirstname = (clientFirstname) => {

    return {
        type: NEW_CLIENT_SET_CLIENT_FIRSTNAME,
        clientFirstname
    }
};

export const newClientSetClientLastname = (clientLastname) => {
    return {
        type: NEW_CLIENT_SET_CLIENT_LASTNAME,
        clientLastname
    }
};

export const newClientSetClientPesel = (clientPesel) => {

    return {
        type: NEW_CLIENT_SET_CLIENT_PESEL,
        clientPesel
    }
};

export const setNewClientSelectedValue = (selectedValue) => {
    return {
        type: NEW_CLIENT_SET_SELECTED_VALUE,
        selectedValue: selectedValue.value
    }
};

export const resetNewClientState = () => {
    return {
        type: RESET_NEW_CLIENT_STATE,
    }
};

export const setVisibilityClientDialog = (value) => {
    return {
        type: SETTING_VISIBILITY_CLIENT_DIALOG,
        value
    }
};
export const addNewClientToSelectedPolicy = (firstname,lastname,pesel,selectedValue,policy,company, currentSelectedPolicy) => dispatch => {
        return requests.post('/addclienttopolicy',
            {
                "firstname": firstname,
                "lastname": lastname,
                "pesel": pesel,
                "selectedValue": selectedValue,
                "company": apiObjectId(company),
                "policy": apiObjectId(policy)
            }
        ).then(
            (response) => {
                dispatch(showGrowl({
                    life: 4000,
                    severity: 'success',
                    summary: 'Client has been added successfully',
                    detail: `added person : ${pesel}`
                }));
                dispatch(setVisibilityClientDialog(false));
                dispatch(dashboardLoadPolicyItem(currentSelectedPolicy));
            })
            .catch(
                (error) => {
                    dispatch(addErrorsToNewClientDialog(parseApiErrors(error)));
                });
};

export const addErrorsToNewClientDialog = (errors) => {
    return {
        type: ADD_ERRORS_TO_NEW_CLIENT_DIALOG,
        errors
    }
};
