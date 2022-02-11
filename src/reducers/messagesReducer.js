import { messagesConstants } from '../constants/actionConstants';

export function alert(state = {}, action) {
    switch (action.type) {
        case messagesConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };
        case messagesConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case messagesConstants.CLEAR:
            return {};
        default:
            return state
    }
}