import { match } from 'react-router';

import { IAppAction, ActionType } from './Helpers';
import { Utility } from '../state/Utility';
import { User } from "../state/User";

export interface IApplicationProps {
    openDrawer: () => IAppAction;
    closeDrawer: () => IAppAction;

    login: (data: any) => IAppAction;
    logout: () => IAppAction;
    setInfo: (data: any) => IAppAction;


    match: match<any>;
    location: any;
    history: any;

    utility: Utility;
    user: User;
    members: any;
    training: any;
    materialCharts: Array<{name: string, value: number, fill: string}>;
}

export const openDrawer = (): IAppAction => {
    return {
        type: ActionType.OPEN_DRAWER
    };
};

export const closeDrawer = (): IAppAction => {
    return {
        type: ActionType.CLOSE_DRAWER
    };
};


export const login = (data: any): IAppAction => {
    return {
      type: ActionType.LOGIN_REQUEST,
      payload: data
    };
};

export const logout = (): IAppAction => {
    return {
      type: ActionType.LOGOUT_REQUEST
    };
};

export const setInfo = (data: any): IAppAction => {
  return {
    type: ActionType.SET_USER_INFO,
    payload: data
  }
};
