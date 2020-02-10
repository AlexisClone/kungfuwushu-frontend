import { Action } from "redux";

export enum ActionType {
    OPEN_DRAWER,
    CLOSE_DRAWER,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    SET_USER_INFO
}

export interface IAppAction extends Action<ActionType> {
    payload?: any;
}
