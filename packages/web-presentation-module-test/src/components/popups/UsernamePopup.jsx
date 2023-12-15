import React from 'react';
import {compose, withAuthContext, modal} from '@efr/medservice-web-presentation-core';
import {Button, Input} from '@efr/medservice-web-presentation-ui';

class UsernamePopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.fromButtons = [
            <Button key="ok"
                    name="OK"
                    dataId="button-ok"
                    onClick={this._handleOk}/>,
            <Button key="cancel"
                    dataId="button-cancel"
                    name="Отменить"
                    onClick={this._handleCancel}
                    type={Button.buttonTypes.secondary}
            />,
            <Button key="current"
                    dataId="current"
                    name="Задать текущий"
                    onClick={this._handleUseCurrent}
                    type={Button.buttonTypes.secondary}/>
        ];
    }

    render = () => (
        <modal.window title="Ввведите имя пользователя" buttons={this.fromButtons}>
            <Input value={this.state.username}
                   onChange={this._handleUsernameChange}
                   dataId="input-username"
                   placeholder={this.props.placeholder}/>
        </modal.window>
    );

    _handleUsernameChange = username => {
        this.setState({username})
    };

    _handleUseCurrent = () => {
        this.setState({username: this.props.authContext.userData.name})
    };

    _handleCancel = () => {
        this.props.modal.close()
    };

    _handleOk = () => {
        this.props.modal.close('success', {username: this.state.username})
    }
}

export default compose(
    withAuthContext,
    modal(true)
)(UsernamePopupComponent);