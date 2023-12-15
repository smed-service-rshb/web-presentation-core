import React from 'react';
import PropTypes from 'prop-types';
import {ServiceLocator} from '../utils'

class CurrentModal {
    constructor(component, props) {
        this.component = component;
        this.props = props;
        this.cbs = {}
    }

    on = (action, cb) => {
        if (this.cbs[action]) {
            throw new Error(`Для экшена ${action} уже задан callback`)
        }
        this.cbs[action] = cb;
        return this;
    };

    close = (action, payload) => {
        const cb = this.cbs[action];
        cb && cb(payload)
    };

    render = () => <this.component {...this.props}/>
}

class ModalProvider extends React.Component {
    static propTypes = {
        /**
         * набор модальных компоненов
         */
        modals: PropTypes.arrayOf(PropTypes.shape({
            /**
             * ключ модального компонента
             */
            key: PropTypes.string.isRequired,

            /**
             * Собственно модальный компонент
             */
            component: PropTypes.func.isRequired,
        })).isRequired,
    };

    static defaultProps = {
        modals: [],
    };

    constructor(props) {
        super(props);
        this.modalsLocator = this._createModalLocator(props.modals);
        this.state = {};
        this.actions = {}
    }

    componentWillReceiveProps = nextProps => {
        this.modalsLocator = this._createModalLocator(nextProps.modals);
    };

    render = () => {
        if (!this.props.children) {
            return null
        }
        return <div className="full-height">
            {this.props.children}
            {this.state.currentModal && this.state.currentModal.render()}
        </div>
    };

    _createModalLocator = modals => {
        const locator = new ServiceLocator();

        for (let modal of modals) {
            locator.register(
                modal.key,
                args => {
                    const currentModal = new CurrentModal(modal.component, args);
                    this.setState({currentModal});
                    return currentModal
                }
            )
        }
        return {
            get: locator.resolve
        }
    };

    _close = (action, payload) => {
        const currentModal = this.state.currentModal;
        this.setState({currentModal: undefined});
        currentModal && currentModal.close(action, payload);
    };

    static childContextTypes = {
        modalsLocator: PropTypes.PropTypes.shape({
            /**
             * Метод получения модального компонента из локатора
             * Входные параметры: (modalkey)
             *    modalkey - ключ модального компонента
             * Возвращаемое значение: модальный компонент
             */
            get: PropTypes.func.isRequired,
        }).isRequired,

        /**
         * Метод закрытия текущего модального окна
         */
        close: PropTypes.func.isRequired,
    };

    getChildContext = () => {
        return {
            modalsLocator: this.modalsLocator,
            close: this._close,
        };
    };
}

export default ModalProvider
//TODO покрыть тестами