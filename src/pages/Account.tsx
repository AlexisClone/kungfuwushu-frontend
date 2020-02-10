import * as React from 'react';
import { Route, Switch } from 'react-router';
import { default as ProfilePage } from './Profile';
import LoginPage from './Authentification/Login';

import { isAuthenticated } from '../store/state';

export default class AccountPage extends React.Component<{}, {}> {

    public render(): JSX.Element {
        return (<Switch>
            <Route exact path="/account" component={isAuthenticated(ProfilePage as any)} />
            <Route path={'/account/login'} component={LoginPage as any} />
        </Switch>);
    }

}
