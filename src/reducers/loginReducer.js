import { authConstants } from '../constants/actionConstants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action){
    switch (action.type) {
        case authConstants.LOGIN:
            return {
                loggingIn: true,
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case authConstants.LOGIN_FAILURE:
            return {};
        case authConstants.LOGOUT:
                return {};
        default:
            return state
    }
}