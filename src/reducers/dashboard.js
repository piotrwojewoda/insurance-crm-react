 import React from 'react';
 import Moment from 'react-moment';
 import 'moment-timezone';
import {
    DASHBOARD_LOAD_POLICIES_RECEIVED,
    DASHBOARD_LOAD_POLICIES_REQUEST, DASHBOARD_LOAD_POLICY_ITEM_RECEIVED, DASHBOARD_LOAD_POLICY_ITEM_REQUEST,
    DASHBOARD_SELECT_POLICY, DASHBOARD_SET_POLICIES_FIRST_PAGE
} from "../actions/constants";

export default (state =
                    {
                       policies: [],
                        clients: [],
                        selectedPolicy: null,
                        selectedClient: null,
                        policiesLoading: false,
                        policiesFirstPage: 1,
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
                }),
                company: action.data.company
            };
        case DASHBOARD_SET_POLICIES_FIRST_PAGE:
            return {
                ...state,
                policiesFirstPage: action.policiesFirstPage
            }

        default:
            return state;
    }
}
