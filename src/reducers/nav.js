import {NAV_CHANGE_PAGE} from "../actions/constants";

export default (state =
                    {
                        page: '/'
                    }, action) => {
    switch (action.type) {
        case NAV_CHANGE_PAGE:
            return {
                ...state,
                page: action.page,
            };
        default:
            return state;
    }
}
