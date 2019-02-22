import 'moment-timezone';
import {
    GET_INSURANCE_CATEGORIES,
    GET_INSURANCE_CATEGORIES_RECEIVED,
    GET_INSURANCE_TYPES_RECEIVED,
    GET_INSURANCE_VALUES_RECEIVED
} from "../actions/constants";
import {GET_INSURANCE_VALUES} from "../actions/constants";

export default (state =
                    {
                        insuranceCategories: [],
                        insuranceTypes: [],
                        insuranceValues: []
                    },
                action) => {
    switch (action.type) {

        case GET_INSURANCE_CATEGORIES:
            return {
                ...state
            };
        case GET_INSURANCE_TYPES_RECEIVED:
            return {
                ...state,
                insuranceTypes: action.data['hydra:member']
            };
        case GET_INSURANCE_CATEGORIES_RECEIVED:
            return {
                ...state,
                insuranceCategories: action.data['hydra:member']
            };
        case GET_INSURANCE_VALUES_RECEIVED:
            return {
                ...state,
                insuranceValues: action.data['hydra:member']
            };
        case GET_INSURANCE_VALUES:
            return {
                ...state
            };
        default:
            return state;

    }


}
