import Cookies from 'js-cookie';

import { IAppAction, ActionType } from './../actions/Helpers';
import { User, UserRole } from '../state/';

export const UserReducer = (state: User = null, action: IAppAction): User => {
    switch (action.type) {

        case ActionType.LOGIN_REQUEST:
            Cookies.set('token', action.payload.token.tokenType + ' ' + action.payload.token.accessToken);
            return new User({
                id: null,
                email: action.payload.email,
                username: '',
                firstName: '',
                lastName: '',
                roles: [ UserRole.ADMIN ]
            });

        case ActionType.LOGOUT_REQUEST:
            return null;

        case ActionType.SET_USER_INFO:
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName
            };

        default:
            return state;
    }
};
