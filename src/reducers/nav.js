import {NAV_CHANGE_PAGE, NAV_RESET_TAB, NAV_TAB_CHANGE} from "../actions/constants";

export default (state =
                    {
                        page: '/',
                        activeItem: null
                    }, action) => {
    switch (action.type) {


        case NAV_RESET_TAB:
            return {
                ...state,
                activeItem: null
            };
        case NAV_TAB_CHANGE:
            return {
                ...state,
                activeItem: action.activeItem
            };
        case NAV_CHANGE_PAGE:
            return {
                ...state,
                page: action.page,
            };
        default:
            return state;
    }
}
