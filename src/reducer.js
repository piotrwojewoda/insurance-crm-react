import {combineReducers} from "redux";
import auth from "./reducers/auth";
import { connectRouter } from 'connected-react-router'
import nav from "./reducers/nav";

export default (history) => combineReducers({
    auth,
    nav,
    router: connectRouter(history),
  //  form: formReducer
});
