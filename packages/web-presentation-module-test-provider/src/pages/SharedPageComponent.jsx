import React from 'react';
import {compose, withPageRouter, withActions, withModals} from '@efr/medservice-web-presentation-core';
import {Button} from '@efr/medservice-web-presentation-ui';

import {PrivateAction} from '../actions';
import {PRIVATE_MODAL} from '../popups/keys';

import {PRIVATE_PAGE} from './keys';


class SharedPageComponent extends React.Component {
    render = () => (
        <div>
            <div>Привет! Я поставляемая страница.</div>
            <div>Чего желает мой повелитель?</div>
            <Button key="back"
                    name="Вернуться"
                    dataId="button-back"
                    onClick={this.props.pageRouter.back}/>
            <Button key="open-private-modal"
                    name="Открыть внутреннее модальное окно"
                    dataId="button-open-private-modal"
                    onClick={() => this.props.modals.privatePopup()}/>
            <Button key="call-private-action"
                    name="Вызвать внутренний экшен"
                    dataId="button-call-private-action"
                    onClick={this.props.actions.action}/>
            <Button key="open-private-page"
                    name="Открыть внутреннюю страницу"
                    dataId="button-open-private-page"
                    onClick={() => this.props.pageRouter.open(PRIVATE_PAGE)}/>
        </div>
    );
}

export default compose(
    withPageRouter,
    withModals({
        privatePopup: PRIVATE_MODAL,
    }),
    withActions({
        action: PrivateAction.name,
    }),
)(SharedPageComponent);
