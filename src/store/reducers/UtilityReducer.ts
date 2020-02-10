import { IAppAction, ActionType } from './../actions/Helpers';
import { Utility } from '../state/Utility';

export const UtilityReducer = (state: Utility = new Utility(), action: IAppAction): Utility => {
    switch (action.type) {
        case ActionType.OPEN_DRAWER:
            return state.set('drawerOpen', true) as Utility;
        case ActionType.CLOSE_DRAWER:
            return state.set('drawerOpen', false) as Utility;
        default:
            return state;
    }
};