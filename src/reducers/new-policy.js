import {GET_COMPANIES_RECEIVED, SET_COMPANY_VALUE} from "../actions/constants";

export const newPolicy = (state =
                    {
                        companyValue: null,
                        suggestedCompanies: null
                    },
                action) => {

    switch (action.type) {

        case GET_COMPANIES_RECEIVED:
            return {
              ...state,
                // suggestedCompanies: action.companies.map( (el) => {
                //     return { name: el['name'], id: el['id'] }
                // } )
                suggestedCompanies: action.companies
            };
        case SET_COMPANY_VALUE:
            return {
                ...state,
                companyValue: action.companyValue
            };

        default:
            return state;
    }
}
