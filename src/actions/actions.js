import {NAV_CHANGE_PAGE, USER_LOGOUT} from "./constants";
import { push } from 'connected-react-router'

export const navChangePage = (page) => (dispatch) => {
    console.log('jestem w nav '+ page);
    dispatch(push(page));
return {
    type: NAV_CHANGE_PAGE,
    page
}};

export const userLogout = () => {
    console.log('logout');
    return {
        type: USER_LOGOUT
    }
}

