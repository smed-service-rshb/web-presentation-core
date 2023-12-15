import React from 'react';
import PropTypes from 'prop-types';
import {ServiceLocator} from '../utils'

export const ActionsContext = React.createContext();

export const restClientSettingsType = PropTypes.PropTypes.shape({
    /**
     * Протокол.
     */
    protocol: PropTypes.oneOf(['http', 'https']),

    /**
     * Хост.
     */
    host: PropTypes.string,

    /**
     * Порт.
     */
    port: PropTypes.number,

    /**
     * Префикс запросов.
     */
    prefix: PropTypes.string,

    /**
     * Префикс запросов.
     */
    timeout: PropTypes.number,

    /**
     * Обертка для клиента
     */
    wrapper: PropTypes.func,
});

export default class ActionProvider extends React.Component {
    static propTypes = {
        /**
         * набор экшенов
         */
        actions: PropTypes.arrayOf(PropTypes.shape({
            /**
             * Название экшена
             */
            name: PropTypes.string.isRequired,

            /**
             * Собственно экшен
             */
            action: PropTypes.func.isRequired,
        })).isRequired,

        /**
         * Настройки RestClient
         */
        restClientSettings: restClientSettingsType
    };

    static defaultProps = {
        actions: [],
        restClientSettings: {}
    };

    constructor(props) {
        super(props);
        this.actionsContext = {
            actionsLocator: this._createActionsLocator(props.actions),
            restClientSettings: this.props.restClientSettings
        };
    }

    render = () => {
        if (this.props.children) {
            return (
                <ActionsContext.Provider value={this.actionsContext}>
                    {this.props.children}
                </ActionsContext.Provider>
            )
        }
        return null
    };

    _createActionsLocator = actions => {
        const locator = new ServiceLocator();
        actions.forEach(action => locator.register(
            action.name,
            action.action
        ));

        return {
            get: locator.resolve
        }
    };
}