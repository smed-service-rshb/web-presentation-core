import React from 'react';
import {withPageRouter, PropTypes} from '@efr/medservice-web-presentation-core';
import {Button, Panel, Form} from '@efr/medservice-web-presentation-ui';
import {PAYMENTS_LIST_PAGE_KEY} from '../page-keys'


class PaymentEditStep3Component extends React.Component {

    back = () => {
        this.props.pageRouter.back("paymentLabel");
    };

    forward = () => {
        this.props.pageRouter.open(PAYMENTS_LIST_PAGE_KEY);
    };


    render = () => {
        const fromButtons = [
            <Button key="forward"
                    dataId="button-forward"
                    name="Вперед"
                    onClick={this.forward}
                    type={Button.buttonTypes.secondary}
            />,
            <Button key="back"
                    dataId="button-back"
                    name="Назад"
                    onClick={this.back}
                    type={Button.buttonTypes.secondary}
            />
        ];

        return (
            <Panel dataId="payment-edit-step3-panel">

                <Form buttons={fromButtons} dataId="payment-edit-step3-form">
                    Третий шаг
                </Form>
            </Panel>
        )
    }
}
PaymentEditStep3Component.propTypes = {
    from: PropTypes.string
};

export default
withPageRouter(PaymentEditStep3Component)
