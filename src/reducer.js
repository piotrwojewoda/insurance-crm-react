import {combineReducers} from "redux";
import auth from "./reducers/auth";
import { connectRouter } from 'connected-react-router'
import nav from "./reducers/nav";
import {reducer as formReducer} from 'redux-form';
import dashboard from "./reducers/dashboard";
import insurance from "./reducers/insurance";
import {growlmessages} from "./reducers/message-reducer";
import {newPolicy} from "./reducers/new-policy";
import {newClient} from "./reducers/new-client";

export default (history) => combineReducers({
    auth,
    nav,
    dashboard,
    insurance,
    growlmessages,
    newClient,
    newPolicy,
    router: connectRouter(history),
    form: formReducer
});
