import { combineReducers } from 'redux';

import { authentication } from './loginReducer';
import { registration } from './registerReducer';
import { alert } from './messagesReducer';
import { recipes } from './recipesReducer';
import { recipe } from './recipeReducer';


const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    recipes,
    recipe
});

export default rootReducer;