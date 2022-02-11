import { recipesConstants } from '../constants/actionConstants';

export function recipe(state = {}, action) {
    switch (action.type) {
        case recipesConstants.GET_RECIPE:
            return { requesting: true };
        case recipesConstants.GET_RECIPE_SUCCESS:
            return { data: action.data };
        case recipesConstants.GET_RECIPE_FAILURE:
            return { error: action.error };
        default:
            return state
    }
}