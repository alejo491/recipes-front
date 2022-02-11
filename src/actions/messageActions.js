import { messagesConstants } from '../constants/actionConstants' ;


const success = (message) => ( { type: messagesConstants.SUCCESS, message });

const error = (message) => ( { type: messagesConstants.ERROR, message });

const clear = ()  => ({ type: messagesConstants.CLEAR });

export const messagesActions = {
    success,
    error,
    clear
};