//#region
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Route, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import * as _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { Menu, MenuItem } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
const classNames = require('classnames');
import { styles } from './styles';

import AppDrawer from './App.Drawer';
import Home from "../pages/Home";
import { TrainingsList } from "../trainings";
import { MemberDetails } from "../members";
import { AccountPage } from "../pages/Account";
import { EvaluateGroup } from "../components/evaluate";
import { TestsList, NewTest, EditTest } from "../components/tests";
import { RanksList, NewRank, EditRank } from "../components/ranks";
import { MyRank, MyTests, TestDetails, ExerciseResultDetails, ExerciseScaleDetails } from "../components/member-space";
import { ProgramsList, NewProgram, EditProgram } from "../components/programs";
import { ExercisesList, NewExercise, EditExercise } from "../components/exercises";

import { IApplicationProps } from '../actions/App.Actions';
import * as AppActionCreators from '../actions/App.Actions';
import { isAuthenticated, IAppState } from "../state/AppState";
//#endregion

interface IAppProps extends IApplicationProps {
    classes: any;
    theme?: any;
}

interface IState {
    anchorEl: any;
    notificationEl: any;
}

class MiniDrawer extends React.Component<IAppProps, IState> {

    public state: IState = {
        anchorEl: null,
        notificationEl: null
    };

    public componentWillMount() {
        //this.props.fetchMembers();
    }

    private navigate = (path: string) => {
        this.props.history.push(path);
    };

    private handleMenu = (event: any) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    private handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    public handleLogout = () => {
        this.props.logout();
        this.handleMenuClose();
        this.navigate('/');
    };

    public handleDrawerOpen = () => {
        this.props.openDrawer();
    };

    public handleDrawerClose = () => {
        this.props.closeDrawer();
    };

    private renderAppBar() {
        if (this.props.authentication) {
            const { classes, utility } = this.props;
            const { anchorEl } = this.state;
            const open = Boolean(anchorEl);

            return (
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, utility.drawerOpen && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!utility.drawerOpen}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, utility.drawerOpen && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={classes.fillSpace} variant="title" color="inherit" noWrap={true}>
                            <FormattedMessage id="app.welcome"
                                              defaultMessage="Welcome to your kung fu APP"
                                              description="Welcome Message"/>
                        </Typography>
                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleMenuClose.bind(this, undefined)}
                            >
                                <MenuItem onClick={this.handleMenuClose.bind(this, '/account')}>{this.props.authentication.name}</MenuItem>
                                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            );
        }

        return null;
    }


    private renderAccount = () => {
        return (
            <AccountPage
              user={this.props.authentication}
              login={this.props.login}
              match={this.props.match}
              location={this.props.location}
            />
        );
    }

    private renderDrawer() {
        const {utility, authentication} = this.props;
        return (
            <Hidden mdDown={!utility.drawerOpen && true}>
                <AppDrawer
                    utility={utility}
                    authentication={authentication}
                    handleDrawerClose={this.handleDrawerClose}
                />
            </Hidden>
        );
    }

    public render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                {this.renderAppBar()}
                {this.renderDrawer()}

                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Route path='/' exact={true} component={isAuthenticated(Home as any)}/>
                    <Route path='/members' component={isAuthenticated(MemberDetails as any)}/>
                    <Route path='/trainings' component={isAuthenticated(TrainingsList as any)}/>
                    <Route path='/account' render={this.renderAccount} />
                    <Route path='/new-exercise' component={isAuthenticated(NewExercise)} />
                    <Route path='/exercises/:id/edit' component={isAuthenticated(EditExercise)} />
                    <Route exact path='/programs' component={isAuthenticated(ProgramsList)} />
                    <Route path='/new-program' component={isAuthenticated(NewProgram)} />
                    <Route path='/programs/:id/edit' component={isAuthenticated(EditProgram)} />
                    <Route exact path='/ranks' component={isAuthenticated(RanksList)} />
                    <Route path='/new-rank' component={isAuthenticated(NewRank)} />
                    <Route path='/ranks/:id/edit' component={isAuthenticated(EditRank)} />
                    <Route exact path='/tests' component={isAuthenticated(TestsList)} />
                    <Route path='/new-test' component={isAuthenticated(NewTest)} />
                    <Route path='/tests/:id/edit' component={isAuthenticated(EditTest)} />
                    <Route path='/tests/:id/evaluate-group' component={isAuthenticated(EvaluateGroup)} />
                    <Route path='/myrank' component={isAuthenticated(MyRank)} />
                    <Route exact path='/mytests' component={isAuthenticated(MyTests)} />
                    <Route path='/mytests/:id' component={isAuthenticated(TestDetails)} />
                    <Route path='/exercises-results/:id' component={isAuthenticated(ExerciseResultDetails)} />
                    <Route path='/exercises-scales/:id' component={isAuthenticated(ExerciseScaleDetails)} />
                    <Route exact path='/exercices' component={ExercisesList} />
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState) => ({
    utility: state.utility,
    authentication: state.authentication,
    users: state.users
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
    bindActionCreators(_.assign({}, AppActionCreators), dispatch);

export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchtoProps)(withStyles(styles as any, {withTheme: true})(MiniDrawer as any)) as any));
