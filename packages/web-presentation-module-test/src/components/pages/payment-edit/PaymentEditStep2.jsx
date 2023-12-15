import React from 'react';
import {withFormData, withPageRouter, compose, PropTypes} from '@efr/medservice-web-presentation-core';
import {Button, Panel, Form, Input, Field} from '@efr/medservice-web-presentation-ui';
import {PAYMENT_EDIT_STEP3_PAGE_KEY} from '../page-keys'

const DescriptionField = withFormData.createField(
    "description",
    ({value, onChange, errorMessage}) => (
        <Field title='Введите нечто' error={errorMessage} required>
            <Input value={value} onChange={onChange} dataId="field-description"/>
        </Field>
    ),
    ({validator}) => ([
        validator.required("Поле 'Нечто' обязательно для заполнения.")
    ])
);

const validationForm = () => {
    const fields = [
        DescriptionField
    ];

    const formValidators = [];

    return withFormData.createValidationForm(
        fields,
        formValidators
    );
};

class PaymentEditStep2Component extends React.Component {

    back = () => {
        this.props.pageRouter.back("paymentLabel");
    };

    forward = () => {
        this.props.pageRouter.open(PAYMENT_EDIT_STEP3_PAGE_KEY, {from: this.props.from});
    };

    render = () => {
        const {validate, errors, renderField} = this.props.formData;

        const fromButtons = [
            <Button key="forward"
                    dataId="button-forward"
                    name="Вперед"
                    onClick={validate(validationForm(), this.forward,  data => {
                        console.log("Ошибки валидации", JSON.stringify(data, null, 2))
                    })}
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
            <Panel dataId="payment-edit-step2-panel">

                <Form buttons={fromButtons} dataId="payment-edit-step2-form" errors={errors.list()}>
                    Второй шаг
                    {renderField(DescriptionField)}
                </Form>
            </Panel>
        )
    }
}
PaymentEditStep2Component.propTypes = {
    from: PropTypes.string
};

export default
compose(
    withPageRouter,
    withFormData)(PaymentEditStep2Component)