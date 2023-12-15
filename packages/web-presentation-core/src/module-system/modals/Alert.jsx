import React from 'react';
import {modal} from '../../modal';
import PropTypes from 'prop-types';
import {Button} from '@efr/medservice-web-presentation-ui';

class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.buttons = [<Button name={props.okButtonName}
                                onClick={this._handleClose}
                                type={Button.buttonTypes.primary}
                                dataId={'alertCloseButton'}/>];
    }

    render = () => (
        <modal.window title={this.props.title} buttons={this.buttons}>
            {this.props.message}
        </modal.window>
    );

    _handleClose = () => {
        this.props.modal.close(this.props.closeAction, this.props.closePayload)
    };

    static defaultProps = {
        title: "Обратите внимание",
        okButtonName: "Закрыть",
        closeAction: 'success'
    };

    static propTypes = {
        /**
         * Заголовок алерта
         */
        title: PropTypes.string.isRequired,

        /**
         * Сообщение алерта
         */
        message: PropTypes.string.isRequired,

        /**
         * Название кнопки алерта
         */
        okButtonName: PropTypes.string.isRequired,

        /**
         * Действие закрыть
         */
        closeAction: PropTypes.string.isRequired,

        /**
         * Payload, передаваемый при закрытии алерта
         */
        closePayload: PropTypes.object,
    }
}

export default modal()(Alert);