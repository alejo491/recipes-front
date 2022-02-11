import { recipesConstants } from '../constants/actionConstants';
import { messagesActions } from './messageActions';
import { recipesService } from '../services/recipesServices';
import { history } from '../utils/history';

const getRecipes = (token) => {
    const request = () =>  ({ type: recipesConstants.GET_RECIPES })
    const success = (data) => ({ type: recipesConstants.GET_SUCCESS, data })
    const failure = (error) => ({ type: recipesConstants.GET_FAILURE, error })
    return dispatch => {
        dispatch(request());

        recipesService.getRecipes(token)
            .then(
                data => { 
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(messagesActions.error(error.toString()));
                }
            );
    };
}

const getRecipe = (token, id) => {
    const request = () =>  ({ type: recipesConstants.GET_RECIPE })
    const success = (data) => ({ type: recipesConstants.GET_RECIPE_SUCCESS, data })
    const failure = (error) => ({ type: recipesConstants.GET_RECIPE_FAILURE, error })
    return dispatch => {
        dispatch(request());

        recipesService.getRecipe(token, id)
            .then(
                data => { 
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(messagesActions.error(error.toString()));
                }
            );
    };
}

const deleteRecipe = (token, id) => {
    const request = () =>  ({ type: recipesConstants.DELETE_RECIPE })
    const success = (data) => ({ type: recipesConstants.DELETE_RECIPE_SUCCESS, data })
    const failure = (error) => ({ type: recipesConstants.DELETE_RECIPE_FAILURE, error })
    return dispatch => {
        dispatch(request());

        recipesService.deleteRecipe(token, id)
            .then(
                data => { 
                    dispatch(success(data));
                    dispatch(getRecipes(token))
                    history.push('/recipes');
                    dispatch(messagesActions.success('Recipe deleted'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(messagesActions.error(error.toString()));
                }
            );
    };
}

const createRecipe = (token, title, image, description) => {
    const request = () =>  ({ type: recipesConstants.CREATE_RECIPE })
    const success = (data) => ({ type: recipesConstants.CREATE_RECIPE_SUCCESS, data })
    const failure = (error) => ({ type: recipesConstants.CREATE_RECIPE_FAILURE, error })
    return dispatch => {
        dispatch(request());

        const form = new FormData();
        form.append('title', title);
        form.append('description', description);
        form.append('file', image);
        recipesService.createRecipe(token, form)
            .then(
                data => { 
                    dispatch(success(data));
                    dispatch(getRecipes(token))
                    history.push('/recipes');
                    dispatch(messagesActions.success('Recipe created'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(messagesActions.error(error.toString()));
                }
            );
    };
}

const updateRecipe = (token, id, title, image, description) => {
    const request = () =>  ({ type: recipesConstants.UPDATE_RECIPE })
    const success = (data) => ({ type: recipesConstants.UPDATE_RECIPE_SUCCESS, data })
    const failure = (error) => ({ type: recipesConstants.UPDATE_RECIPE_FAILURE, error })
    return dispatch => {
        dispatch(request());

        const form = new FormData();
        form.append('title', title);
        form.append('description', description);
        if(image !== ''){
            form.append('file', image);
        }
        recipesService.updateRecipe(token, id, form)
            .then(
                data => { 
                    dispatch(success(data));
                    dispatch(getRecipes(token))
                    history.push('/recipes');
                    dispatch(messagesActions.success('Recipe updated'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(messagesActions.error(error.toString()));
                }
            );
    };
}



export const recipesActions = {
    getRecipes,
    getRecipe,
    deleteRecipe,
    createRecipe,
    updateRecipe
};