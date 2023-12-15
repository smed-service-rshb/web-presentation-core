import React from 'react';
import {withPageRouter, withActions, withFormData, compose, PropTypes} from '@efr/medservice-web-presentation-core';
import {Field, Select, Button, Panel, Form} from '@efr/medservice-web-presentation-ui';
import {PAYMENT_EDIT_STEP2_PAGE_KEY} from '../page-keys'
import {InitTransferAction} from "../../../actions/index";

const FromResourceField = withFormData.createField(
    'fromResource',
    ({value, onChange, errorMessage}, {options = [], disabled = false, required = false}) => {
        if (options.length !== 0) {
            return (
                <Field title="Счет списания" required={required} error={errorMessage}>
                    <Select disabled={disabled}
                            options={options}
                            value={value}
                            onChange={onChange}
                            placeholder=""
                            dataId="fromResource"
                    />
                </Field>)
        } else {
            return (
                <Field title="Счет списания">
                    Нет доступных счетов
                </Field>
            )
        }
    }
);


const ToResourceField = withFormData.createField(
    'toResource',
    ({value, onChange, errorMessage}, {options = [], disabled = false, required = false}) => {
        if (options.length !== 0) {
            return (
                <Field title="Счет зачисления" required={required} error={errorMessage}>
                    <Select disabled={disabled}
                            options={options}
                            value={value}
                            onChange={onChange}
                            placeholder=""
                            dataId="toResource"
                    />
                </Field>
            )
        } else {
            return (
                <Field title="Счет зачисления">
                    Нет доступных счетов
                </Field>
            )
        }
    }
);



class PaymentEditStep1Component extends React.Component {
    state = {};

    back = () => {
        this.props.pageRouter.back("paymentLabel")
    };

    forward = () => {
        this.props.pageRouter.open(PAYMENT_EDIT_STEP2_PAGE_KEY, {from: this.props.from});
    };

    componentDidMount = () => {
        this.props.pageRouter.markPrevPage("paymentLabel");
        this.initTransfer();
    };

    initTransfer = () => {
        //На сервере пока стоит заглушка поэтому можно отсылать любое id
        this.props.actions.initTransferAction(12312)
            .then(result => {
                this.setState({invoices: result})
            })
    };

    getOptions = (option) => {
        let resources;
        if (!!this.state.invoices) {
            if (option === 'from') {
                resources = this.state.invoices.fromResources;
            } else if (option === 'to') {
                resources = this.state.invoices.toResources;
            }
        }

        if (!!resources) {
            return (resources.map(data => {
                let label = data.number + ' (' + data.type + ') ' + data.department + ' ' + data.rest + ' ' + data.currency;
                return ({
                    value: data.id.toString(),
                    label: label,
                    rest: data.rest,
                    currency: data.currency,
                    type: data.type,
                    authorityId: data.authorityId
                })
            }));
        }
        return [];
    };



    render = () => {
        const {renderField} = this.props.formData;

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
            <Panel dataId="paymentStep1" label="Первый шаг" labelSecondary={this.props.from}>
                <Form buttons={fromButtons} dataId="payment-edit-step1-form">
                    {renderField(FromResourceField,{options: this.getOptions('from')})}
                    {renderField(ToResourceField,{options: this.getOptions('to')})}
                </Form>
            </Panel>
        )
    }
}

PaymentEditStep1Component.propTypes = {
    from: PropTypes.string
};

export default
compose(
    withPageRouter,
    withActions({
        initTransferAction: InitTransferAction.name
    }),
    withFormData
)(PaymentEditStep1Component)
