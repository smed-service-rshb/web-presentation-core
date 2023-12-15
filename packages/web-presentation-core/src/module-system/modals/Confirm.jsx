import React from 'react';
import {modal} from '../../modal';
import PropTypes from 'prop-types';
import {Button} from '@efr/medservice-web-presentation-ui';

class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.buttons = [
            <Button name="Да"
                    onClick={this._handleClose('success')}
                    type={Button.buttonTypes.primary}
                    dataId={'confirmYesButton'}/>,
            <Button name="Нeт"
                    onClick={this._handleClose()}
                    type={Button.buttonTypes.secondary}
                    dataId={'confirmNoButton'}/>
        ];
    }

    render = () => (
        <modal.window title={this.props.title} buttons={this.buttons}>
            {this.props.message}
        </modal.window>
    );

    _handleClose = action => () => {
        this.props.modal.close(action)
    };

    static defaultProps = {
        title: "Обратите внимание"
    };

    static propTypes = {
        /**
         * Заголовок конфирма
         */
        title: PropTypes.string.isRequired,

        /**
         * Сообщение конфирма
         */
        message: PropTypes.string.isRequired,
    }
}

export default modal(true)(Confirm);