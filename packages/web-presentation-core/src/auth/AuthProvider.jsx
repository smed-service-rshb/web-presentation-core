import React from 'react';
import PropTypes from 'prop-types';
import superagentIntercept from 'superagent-intercept'

import {withActions} from '../actions'

import {ActionsContext} from '../actions/ActionProvider'

import authorization from './authorization'
import {EFR_SESSION_MARKER_HEADER_NAME} from "./constants";

const unauthorisedSessionData = {};

export const AuthContext = React.createContext({});

class AuthProvider extends React.Component {

    UNSAFE_componentWillUpdate = nextProps => {
        this.authContextValue = {
            ...this.props.actionsContext,
            restClientSettings: this._wrapRestClientSettings(),
            authContext: nextProps.authContext,
        };
    };

    static propTypes = {
        /**
         * Листнер изменений контекста.
         * Входные параметры: authContext
         * Возвращаемое значение: отсутсвуют
         */
        onChangeContext: PropTypes.func
    };

    render = () => {
        //пока нет инфы о юзерах, ничего не рисуем
        if (!this.props.authContext || !this.props.children) {
            return null
        }

        return (
            <AuthContext.Provider value={this.authContextValue}>
                <ActionsContext.Provider value={this.authContextValue}>
                    {this.props.children}
                </ActionsContext.Provider>
            </AuthContext.Provider>
        )
    };

    componentDidMount = () => {
        this._getSessionInfo();
    };

    _getSessionInfo = () => {
        const actions = this.props.actions;
        actions.session()
            .then(sessionData => {
                this._updateAuthContext(sessionData)
            })
            .catch(this._unauthorised);
    };

    _updateAuthContext = ({user, rights, menu, sessionMaker}) => {
        const authContext = this._buildAuthContext(user, rights, menu, sessionMaker);

        this.props.onChangeContext && this.props.onChangeContext(authContext);
    };

    _buildAuthContext = (user, rights, menu, sessionMaker) => {
        const login = this._login;
        const logout = this._logout;
        const changePassword = this._changePassword;
        const checkPermission = authorization(rights);
        return {
            authenticated: user && !user.changePassword && !!user.office,
            checkPermission,
            login,
            logout,
            changePassword,
            userData: user,
            menu,
            sessionMaker
        }
    };

    _login = (...args) => {
        return this.props.actions.login(...args)
            .then(sessionData => {
                this._updateAuthContext(sessionData);
                return sessionData
            })
    };

    _logout = () => {
        return Promise.resolve()
            .then(this.props.actions.logout)
            .then(data => {
                this._unauthorised();
                return data
            }, e => {
                this._unauthorised();
                throw e;
            })
    };

    _changePassword = (...args) => {
        return this.props.actions.changePassword(...args)
            .then(sessionData => {
                if(sessionData.user && !sessionData.user.changePassword) {
                    this._updateAuthContext(sessionData);
                }
                return sessionData
            })
    };

    _unauthorised = () => this._updateAuthContext(unauthorisedSessionData);

    _wrapRestClientSettings = () => {
        const prevRestClientSettings = this.props.actionsContext.restClientSettings;
        return {
            ...prevRestClientSettings,
            wrapper: RestClient => {
                let client = RestClient;
                if (prevRestClientSettings.wrapper) {
                    client = prevRestClientSettings.wrapper(RestClient);
                }
                client.use(superagentIntercept((err, res) => {
                    if (!res) {
                        return;
                    }
                    if (res.status === 401) {
                        this._unauthorised();
                        return;
                    }
                    const prevSessionMaker = this.props.authContext.sessionMaker;
                    const newSessionMaker = res.headers[EFR_SESSION_MARKER_HEADER_NAME];
                    if (prevSessionMaker !== newSessionMaker) {
                        this._getSessionInfo();
                    }

                }));
                return client;
            }
        };
    };

}

//эти actions - не завраплены... завраплены только дети будут
export default withActions({
    session: 'auth.session',
    login: 'auth.login',
    logout: 'auth.logout',
    changePassword: 'auth.change.password'
})(AuthProvider)