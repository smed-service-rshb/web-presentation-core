import React from 'react';
import PropTypes from 'prop-types';
import {PreloaderProvider} from '@efr/medservice-web-presentation-ui'

import {PageRouter} from '../page-router'
import {AuthProvider} from '../auth'
import {ActionProvider, restClientSettingsType} from '../actions'
import {ModalProvider} from '../modal'
import SystemModule from '../module-system'
import './styles.css'

import buildConfiguration from './configuration'

export default class Application extends React.Component {
    static propTypes = {
        /**
         * Метаданные модулей
         */
        modulesDefinition: PropTypes.arrayOf(PropTypes.func).isRequired,

        /**
         * Функция, формирующая дерево навигации(меню)
         */
        navigationTree: PropTypes.func.isRequired,

        /**
         * История
         */
        history: PropTypes.object.isRequired,

        /**
         * Настройки RestClient
         */
        restClientSettings: restClientSettingsType
    };
    static defaultProps = {
        restClientSettings: {}
    };

    constructor(props) {
        super(props);
        this.configuration = buildConfiguration([...props.modulesDefinition, SystemModule], props.navigationTree);
        this.state = this.configuration();
    }

    _handleChangeContext = authContext => {
        this.setState(this.configuration(authContext))
    };

    _getPages = () => this.state.pages();

    render = () => {
        const {actions, modals, authContext} = this.state;
        return (
            <div className="full-height">
                <PreloaderProvider>
                    <ActionProvider actions={actions} restClientSettings={this.props.restClientSettings}>
                        <AuthProvider onChangeContext={this._handleChangeContext} authContext={authContext}>
                            <ModalProvider modals={modals}>
                                <PageRouter pages={this._getPages} history={this.props.history}/>
                            </ModalProvider>
                        </AuthProvider>
                    </ActionProvider>
                </PreloaderProvider>
            </div>
        )
    };
}