import { authConstants } from '../constants/actionConstants';
import { authService } from '../services/authServices';
import { messagesActions } from './messageActions';
import { history } from '../utils/history';

const login = (username, password) => {
    const request = (user) =>  ({ type: authConstants.LOGIN, user })
    const success = (user) => ({ type: authConstants.LOGIN_SUCCESS, user })
    const failure = (error) => ({ type: authConstants.LOGIN_FAILURE, error })
    return dispatch => {
        dispatch(request({ username }));

        authService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/recipes');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(messagesActions.error(error.toString()));
                }
            );
    };
}

const logout = () => {
    const out = () => ({ type: authConstants.LOGOUT })
    return dispatch => {
        dispatch(out())
        localStorage.removeItem('user');
        history.push('/')
    };
}

const register = (user) => {
    const request = (user) => ({ type: authConstants.REGISTER_REQUEST, user })
    const success = (user) => ({ type: authConstants.REGISTER_SUCCESS, user })
    const failure = (error) => ({ type: authConstants.REGISTER_FAILURE, error })
    
    return dispatch => {
        dispatch(request(user));

        authService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/');
                    dispatch(messagesActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(messagesActions.error(error.toString()));
                }
            );
    };

}

export const authActions = {
    login,
    register,
    logout
};