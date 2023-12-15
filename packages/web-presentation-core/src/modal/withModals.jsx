import React from 'react';
import PropTypes from 'prop-types';
import ModalProvider from './ModalProvider'
import * as ModalKeys from '../module-system/modals/modals-keys'

const defaultModals = {
    confirm: ModalKeys.CONFIRM_MODAL_KEY,
    alert: ModalKeys.ALERT_MODAL_KEY,
};
const withModals = (modalsToProps = {}) => Component => {

    const modalDescriptions = {...defaultModals, ...modalsToProps};

    const buildModals = modalLocator => {
        const result = {};
        for (let modalName of Object.keys(modalDescriptions)) {
            let modalDescription = modalDescriptions[modalName];
            result[modalName] = modalLocator.get(modalDescription)
        }
        return result;
    };

    return class C extends React.Component {
        constructor(props, context) {
            super(props);
            this.modals = buildModals(context.modalsLocator);
        }

        render = () => <Component {...this.props} modals={this.modals}/>;

        static displayName = `withModal(${Component.displayName || Component.name})`;
        static WrappedComponent = Component;

        static contextTypes = ModalProvider.childContextTypes;

        static propTypes = {
            ...Component.propTypes,
            modals: PropTypes.object
        };
        static defaultProps = Component.defaultProps;
    };
};

export default withModals
//TODO покрыть тестами