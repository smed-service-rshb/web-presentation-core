import React from 'react';
import {compose, modal} from '@efr/medservice-web-presentation-core';
import {Button} from '@efr/medservice-web-presentation-ui';

class SharedPopupComponent extends React.Component {
    render = () => (
        <modal.window title={`Привет! Я поставляемое модальное окно.`} buttons={[
            <Button key="ok"
                    name="OK"
                    dataId="button-ok"
                    onClick={this.props.modal.close}/>,
        ]}>
            Чего желает мой повелитель?
        </modal.window>
    );
}

export default compose(
    modal(true),
)(SharedPopupComponent);
