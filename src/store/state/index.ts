import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

import { Utility } from './Utility';
import { Model } from "./Helpers";
import { User } from "./User";

export { Utility } from './Utility';
export { User, UserRole } from './User';

export interface IAppState {
    utility?: Utility;
    user?: User;
}

export const AppStateModel = Model<IAppState>({
    utility: new Utility(),
    user: null,
});

export class AppState extends AppStateModel {
    public static UTILITY = 'utility';
    public static AUTHENTICATION = "authentication";

    public utility: Utility;
    public user: User;
}

export const isAuthenticated = connectedRouterRedirect({
    redirectPath: '/account/login',
    authenticatedSelector: (state: AppState) => state.user !== null,
    wrapperDisplayName: 'Authenticated'
}) as any;
