import { recipesConstants } from '../constants/actionConstants';

export function recipes(state = {}, action) {
    switch (action.type) {
        case recipesConstants.GET_RECIPES:
            return { requesting: true };
        case recipesConstants.GET_SUCCESS:
            return { data: action.data };
        case recipesConstants.GET_FAILURE:
            return { error: action.error };
        case recipesConstants.DELETE_RECIPE:
            return { requesting: true };
        case recipesConstants.DELETE_RECIPE_SUCCESS:
            return { data: action.data };
        case recipesConstants.DELETE_RECIPE_FAILURE:
            return { error: action.error };
        default:
            return state
    }
}