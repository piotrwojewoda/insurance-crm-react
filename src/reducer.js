import {combineReducers} from "redux";
import auth from "./reducers/auth";
import { connectRouter } from 'connected-react-router'
import nav from "./reducers/nav";
import {reducer as formReducer} from 'redux-form';
import dashboard from "./reducers/dashboard";

export default (history) => combineReducers({
    auth,
    nav,
    dashboard,
    router: connectRouter(history),
    form: formReducer
});
