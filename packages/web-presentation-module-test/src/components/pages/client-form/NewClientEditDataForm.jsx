import React, {Component} from 'react';

import {
    withPageRouter,
    compose,
    withFormData,
} from '@efr/medservice-web-presentation-core';
import {
    Button,
    Panel,
    Field,
    Form,
    Input,
} from '@efr/medservice-web-presentation-ui';

import {CLIENT_FORM_PAGE_KEY} from "../page-keys";

import {ClientManuallySetupMenuDataLayout} from "./layout";


const FIELDS = {
    clientId: 'clientId',
    systemId: 'systemId',
};

const ClientIdField = withFormData.createField(
    FIELDS.clientId,
    ({value, setValue, errorMessage}, {title = 'clientId', disabled = false, required = true}) => (
        <Field title={title} error={errorMessage} required={required}>
            <Input type='text' value={value} onChange={setValue} disabled={disabled} dataId="field-clientId"/>
        </Field>
    )
);

const SystemIdField = withFormData.createField(
    FIELDS.systemId,
    ({value, setValue, errorMessage}, {title = 'systemId', disabled = false, required = true}) => (
        <Field title={title} error={errorMessage} required={required}>
            <Input type='text' value={value} onChange={setValue} disabled={disabled} dataId="field-systemId"/>
        </Field>
    )
);

const validationForm = withFormData.createValidationForm(
    [
        ClientIdField,
        SystemIdField,
    ],
);

class NewClientEditDataForm extends Component {
    _saveClient = ({clientId, systemId}) => {
        this.props.pageRouter.open(CLIENT_FORM_PAGE_KEY, {clientId, systemId})
    };

    render = () => {
        const {validate, errors, renderField} = this.props.formData;

        const fromButtons = [
            <Button key="save"
                    name="Сохранить"
                    dataId="button-save"
                    onClick={validate(validationForm, this._saveClient, data => {
                        console.log("Ошибки валидации", JSON.stringify(data, null, 2))
                    })}/>,
        ];

        return (
            <Panel dataId="new-client-form-panel" label="Редактирование клиента">
                <Form buttons={fromButtons} errors={errors.list()} dataId="entity-edit-form">
                    {renderField(ClientIdField)}
                    {renderField(SystemIdField)}
                </Form>
            </Panel>
        )
    }
}

export default compose(
    ClientManuallySetupMenuDataLayout,
    withFormData,
    withPageRouter,
)(NewClientEditDataForm);