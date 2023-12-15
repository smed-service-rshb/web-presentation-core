import React from 'react';
import {PropTypes, withPageRouter, withAuthContext, withModals, compose} from '@efr/medservice-web-presentation-core';

import {EntitiesListPage} from '../entities-list'
import {PopupKeys} from '../../popups'

class EntityViewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: props.authContext.userData.name}
    }

    _goToList = e => {
        e.preventDefault();
        this.props.pageRouter.open(EntitiesListPage.key)
    };

    _handleChangeUsername = e => {
        e.preventDefault();
        this.props.modals.confirm({message: "Ты уверен?"})
            .on('cancel', () => {
                console.log('Нерешительный какой....')
            })
            .on('success', this._openUsernamePopup("ФИО"));
    };

    _openUsernamePopup = placeholder => () => {
        this.props.modals.username({placeholder})
            .on('cancel', () => {
                console.log('Имя не было изменено....')
            })
            .on('success', this._changeUsername)
    };

    _changeUsername = ({username}) => {
        this.props.modals.alert({message: `Имя пользователя изменено на ${username}.`})
            .on('success', () => {
                this.setState({username})
            })
    };

    render = () => (
        <div>
            <div>
                Entity VIEW <span id="entity-id">{this.props.id}</span>
            </div>
            {
                this.props.authContext.checkPermission('entities-list-permission') &&
                <div>
                    <a href="/" id="list-link" onClick={this._goToList}> к списку</a>
                </div>
            }
            <div>
                Current user: <span id="user-name-id">{this.state.username}</span>.&nbsp;
                <a href="#username" onClick={this._handleChangeUsername}>Изменить</a>
            </div>
        </div>
    );

    static propTypes = {
        id: PropTypes.number.isRequired,
    };
}

export default compose(
    withPageRouter,
    withAuthContext,
    withModals({
        username: PopupKeys.USERNAME_POPUP_KEY,
    })
)(EntityViewComponent)
