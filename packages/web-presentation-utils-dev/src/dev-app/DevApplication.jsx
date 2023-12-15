import React from 'react';
import PropTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory'

import {Application} from '@efr/medservice-web-presentation-core'
import DevPanel from './dev-panel'
import processModulesDefinition from './DevModulesBuilder';
import './styles.css'

const history = createHistory();
const DEV_PANEL = false;

export default class DevApplication extends React.Component {
    static propTypes = {
        /**
         * Метаданные модулей
         */
        modulesDefinition: PropTypes.arrayOf(PropTypes.func).isRequired,

        /**
         * Функция, формирующая дерево навигации(меню)
         */
        navigationTree: PropTypes.func.isRequired,

        restClientSettings: Application.propTypes.restClientSettings
    };

    constructor(props) {
        super(props);
        this.modulesDefinition = processModulesDefinition(props.modulesDefinition)
    }

    state = {panelOpened: DEV_PANEL};

    _handleClick = e => {
        e.preventDefault();
        this.setState({panelOpened: !this.state.panelOpened})
        /*TODO состояние можно хранить в store браузера*/
    };

    render = () => (
        <div className="full-height">
            {DEV_PANEL && <div className="dev-panel-button"
                               onClick={this._handleClick}>{this.state.panelOpened ? 'Скрыть' : 'Показать'} панель
            </div>}

            <Application navigationTree={this.props.navigationTree}
                         modulesDefinition={this.modulesDefinition.restrictedDefinitions}
                         history={history}
                         restClientSettings={this.props.restClientSettings}
            />

            {this.state.panelOpened && <DevPanel {...this.modulesDefinition} />}
        </div>
    )
}