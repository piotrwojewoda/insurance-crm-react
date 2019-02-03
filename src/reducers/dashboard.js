 import React from 'react';
 import Moment from 'react-moment';
 import 'moment-timezone';
import {
    DASHBOARD_LOAD_POLICIES_RECEIVED,
    DASHBOARD_LOAD_POLICIES_REQUEST, DASHBOARD_LOAD_POLICY_ITEM_RECEIVED, DASHBOARD_LOAD_POLICY_ITEM_REQUEST,
    DASHBOARD_SELECT_POLICY
} from "../actions/constants";

export default (state =
                    {
                       policies: [],
                        clients: [],
                        selectedPolicy: null,
                        selectedClient: null,
                        policiesLoading: false,
                        clientsLoading: false,
                        policiesAmount: 0
                    },
                action) => {
    switch (action.type) {
        case DASHBOARD_LOAD_POLICIES_RECEIVED:
            return {
                ...state,
                policies: action.data['hydra:member'].map(
                    (e) => {
                        e.startdate = (<Moment format="Y-MM-DD">{e.startdate}</Moment>);
                        e.enddate = (<Moment format="Y-MM-DD">{e.enddate}</Moment>);
                        return e;
                    }
                    ),
                policiesAmount: action.data['hydra:totalItems'],
                policiesLoading: false
            };
        case DASHBOARD_LOAD_POLICIES_REQUEST:
            return {
                ...state,
                policiesLoading: true,
                selectedPolicy: null
            };
        case DASHBOARD_SELECT_POLICY:

            console.log('reduxer')
            return {
                ...state,
                selectedPolicy: action.policy.value
            };
        case DASHBOARD_LOAD_POLICY_ITEM_REQUEST:

            return {
                ...state,
                clientsLoading: true,
                clients: []
            }


        case DASHBOARD_LOAD_POLICY_ITEM_RECEIVED:
            return {
                ...state,
                clientsLoading: false,
                clients: action.data.clients.map( (e) => {
                    e.birthdate = (<Moment format="Y-MM-DD">{e.birthdate}</Moment>)
                    return e;
                })
            };
        default:
            return state;
    }
}
