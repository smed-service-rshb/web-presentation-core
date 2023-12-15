import React from 'react';
import {withPageRouter} from '@efr/medservice-web-presentation-core';
import {Button, Panel, Form} from '@efr/medservice-web-presentation-ui';
import {PAYMENT_EDIT_STEP1_PAGE_KEY} from '../page-keys'

class PaymentsListComponent extends React.Component {

    goToIndex = () => {
        this.props.pageRouter.openIndex()
    };

    createPayment = () => {
        this.props.pageRouter.open(PAYMENT_EDIT_STEP1_PAGE_KEY)
    };

    render = () => {
        const fromButtons = [
            <Button key="forward"
                    dataId="button-forward"
                    name="Создать"
                    onClick={this.createPayment}
                    type={Button.buttonTypes.secondary}
            />,
            <Button key="to-index"
                    dataId="button-index"
                    name="На дефолтную страницу"
                    onClick={this.goToIndex}
                    type={Button.buttonTypes.secondary}/>
        ];

        return (
            <Panel dataId="payment-panel">
                <Form buttons={fromButtons} dataId="payment-edit-step1-form">
                    Список платежей
                </Form>
            </Panel>
        )
    }
}

export default withPageRouter(PaymentsListComponent)

