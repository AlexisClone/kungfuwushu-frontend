import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as querystring from 'querystring';

import { Theme, withStyles, FormControl, InputLabel, Input, InputAdornment, Button, Icon } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { User } from '../../store/state/';
import * as api from '../../api';

import { IApplicationProps, login, setInfo } from '../../store/actions';

interface ISignUpProps {
    login: (data: any) => void;
    setInfo: (data: any) => void;
    match?: any;
    location?: any;
    classes?: any;
    user: User;
}

interface ISignUpState {
    email: string;
    password: string;
    passwordConfirmation: string;
    firstName: string;
    lastName: string;
    username: string;
    birthdate: Date;
    error?: string;
}

class SignUpPage extends React.Component<ISignUpProps, ISignUpState> {

    componentWillMount() {
        this.setState({
            email: '',
            password: '',
            passwordConfirmation: '',
            firstName: '',
            lastName: '',
            username: '',
            birthdate: new Date(),
            error: null
        });
    }

    private handleEmailAddressChange = (event: any) => {
        this.setState({ email: event.target.value });
    }

    private handlePasswordChange = (event: any) => {
        this.setState({ password: event.target.value });
    }

    private handlePasswordConfirmationChange = (event: any) => {
        this.setState({ passwordConfirmation: event.target.value });
    }

    private handleFirstNameChange = (event: any) => {
        this.setState({ firstName: event.target.value });
    }

    private handleLastNameChange = (event: any) => {
        this.setState({ lastName: event.target.value });
    }

    private handleUsernameChange = (event: any) => {
        this.setState({ username: event.target.value });
    }

    private handleBirthdateChange = (date: Date) => {
        this.setState({
            birthdate: date
        }, () => {
        });
    }

    private handleSignup = () => {
        this.setState({
            ...this.state,
            error: null // remove error message
        }, () => {

            let { email, password, passwordConfirmation, firstName, lastName, username } = this.state;

            if (password != '' && passwordConfirmation != '' && password === passwordConfirmation) {

                // Signing up...
                api.Auth.signup(email, password, firstName, lastName, username)
                .then(() => {
                    // Singin up success, logining in...
                    api.Auth.login(username, password)
                    .then(({ user, token }) => {
                        this.props.login({
                            ...this.state,
                            token
                        });
                        this.props.setInfo(user);
                    });
                })
                .catch((err) => {
                    // error triggerred
                    console.log("err ", err);
                    this.setState({
                        ...this.state,
                        error: "Une erreur est survenue, veuillez réessayer."
                    });
                });

            } else {
                // if a password field is empty or if password doesn't match
                this.setState({
                    ...this.state,
                    error: 'Merci de verifier que vos mots de passes correspondent'
                });
            }
        });
    }

    private submitOnEnter = (e: any) => {
        // if enter is pressed
        if (e.keyCode == 13) {
            this.handleSignup();
        }
    }

    public render(): JSX.Element {
        const classes = this.props.classes;

        if (this.props.user) {
            const path: string = querystring.parse((this.props.location.search as string).substr(1)).redirect as any || '/members';
            return <Redirect to={path} />
        }

        return (
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <h2>{'Inscription'}</h2>

                    {/* Email */}
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel htmlFor="email">Addresse mail</InputLabel>
                        <Input
                            value={this.state.email}
                            onChange={this.handleEmailAddressChange}
                            onKeyDown={this.submitOnEnter}
                            id="email"
                            startAdornment={
                                <InputAdornment position="start">
                                <Icon>email</Icon>
                                </InputAdornment>}
                        />
                    </FormControl>

                    {/* Password */}
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel htmlFor="password">Mot de passe</InputLabel>
                        <Input
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            onKeyDown={this.submitOnEnter}
                            type="password"
                            id="password"
                            startAdornment={
                                <InputAdornment position="start">
                                <Icon>lock</Icon>
                                </InputAdornment>}
                        />

                    </FormControl>

                    {/* Password confirmation */}
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel htmlFor="password">Confirmation du mot de passe</InputLabel>
                        <Input
                            value={this.state.passwordConfirmation}
                            onChange={this.handlePasswordConfirmationChange}
                            onKeyDown={this.submitOnEnter}
                            type="password"
                            id="passwordConfirmation"
                            startAdornment={
                                <InputAdornment position="start">
                                <Icon>lock</Icon>
                                </InputAdornment>}
                        />
                    </FormControl>

                    {/* First Name */}
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel htmlFor="">Prénom</InputLabel>
                        <Input
                            value={this.state.firstName}
                            onChange={this.handleFirstNameChange}
                            onKeyDown={this.submitOnEnter}
                            id="firstName"
                            startAdornment={
                                <InputAdornment position="start">
                                <Icon>person</Icon>
                                </InputAdornment>}
                        />
                    </FormControl>

                    {/* Last Name */}
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel htmlFor="">Nom</InputLabel>
                        <Input
                            value={this.state.lastName}
                            onChange={this.handleLastNameChange}
                            onKeyDown={this.submitOnEnter}
                            id="lastName"
                            startAdornment={
                                <InputAdornment position="start">
                                <Icon>person</Icon>
                                </InputAdornment>}
                        />
                    </FormControl>

                    {/* Username */}
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel htmlFor="">Username</InputLabel>
                        <Input
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            onKeyDown={this.submitOnEnter}
                            id="username"
                            startAdornment={
                                <InputAdornment position="start">
                                <Icon>person</Icon>
                                </InputAdornment>}
                        />
                    </FormControl>

                    {/* Birthdate */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <FormControl required={true} fullWidth={true} className={classes.field}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              label="Date de naissance"
                              value={this.state.birthdate}
                              onChange={this.handleBirthdateChange}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                        </FormControl>
                    </MuiPickersUtilsProvider>

                    {/* Buttons */}
                    <div className={classes.actions}>
                        <Button variant="contained" className={classes.button}>
                            Annuler
                        </Button>
                        <Button
                            onClick={this.handleSignup}
                            variant="contained"
                            color="primary"
                            className={classes.button}>
                            S'inscrire
                        </Button>
                    </div>

                </Paper>
            </div>
                    );
                }
            }

            const styles = (theme: Theme) => ({
                container: {
                    display: 'flex',
                    justifyContent: 'center'
                },
                paper: theme.mixins.gutters({
                    paddingTop: 16,
                    paddingBottom: 16,
                    marginTop: theme.spacing(3),
                    width: '30%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    [theme.breakpoints.down('md')]: {
                        width: '100%',
                    },
                }),
                field: {
                    marginTop: theme.spacing(3)
                },
                actions: theme.mixins.gutters({
                    paddingTop: 16,
                    paddingBottom: 16,
                    marginTop: theme.spacing(3),
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center'
                }),
                button: {
                    marginRight: theme.spacing(1)
                },
            });

            const mapStateToProps = (state: IApplicationProps) => ({
                user: state.user
            });

            const mapDispatchToProps = (dispatch: Dispatch) => ({
                login: (data: any) => dispatch(login(data)),
                setInfo: (data: any) => dispatch(setInfo(data)),
            });

            export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(SignUpPage as any) as any);
