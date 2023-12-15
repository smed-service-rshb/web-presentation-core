import React from 'react';
import {compose, modal} from '@efr/medservice-web-presentation-core';
import {Button} from '@efr/medservice-web-presentation-ui';

class PrivatePopupComponent extends React.Component {
    render = () => (
        <modal.window title={`Привет! Я внутреннее модальное окно.`} buttons={[
            <Button key="ok"
                    name="OK"
                    dataId="button-ok"
                    onClick={this.props.modal.close}/>,
        ]}>
            Опять работа?!
        </modal.window>
    );
}

export default compose(
    modal(true),
)(PrivatePopupComponent);
