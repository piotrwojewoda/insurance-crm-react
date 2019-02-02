import {DASHBOARD_LOAD_POLICIES_RECEIVED} from "../actions/constants";

export default (state =
                    {
                       policies: [],
                        clients: [],
                        selectedPolice: null,
                        selectedClient: null
                    },
                action) => {
    switch (action.type) {
        case DASHBOARD_LOAD_POLICIES_RECEIVED:
            return {
                ...state,
                policies: action.data['hydra:member']
            }

        default:
            return state;
    }
}
