import React from 'react';

import {compose, PropTypes, withPageRouter} from '@efr/medservice-web-presentation-core';
import {Button, Field, Fieldset, Panel, Link} from '@efr/medservice-web-presentation-ui';

import {FIND_CLIENT_FORM_PAGE_KEY, PAYMENT_EDIT_STEP1_PAGE_KEY} from '../page-keys'

import {ClientDefaultLayout} from "./layout";


export const buildClientProfileInfo = ({systemId, clientId, pageRouter}) => <Fieldset
    title="Информация из анкеты клиента">
    <Field title="Система">{systemId}</Field>
    <Field title="Идентификатор клиента">{clientId}</Field>
    <Button key="clearClientProfileData"
            dataId="button-clearClientProfileData"
            name="Завершить работу с клиентом"
            onClick={() => {
                pageRouter.open(FIND_CLIENT_FORM_PAGE_KEY);
            }}
    />
</Fieldset>;

class ClientFormComponent extends React.Component {

    goToIndex = () => {
        this.props.pageRouter.openIndex()
    };

    createPayment = () => {
        const queryParam = {from: "Переход из анкеты клиента"};
        this.props.pageRouter.open(PAYMENT_EDIT_STEP1_PAGE_KEY, queryParam)
    };

    render = () => {
        const {systemId, clientId, pageRouter} = this.props;

        return (
            <Panel dataId="client-form-panel" label="Анкета клиента">
                <Fieldset title="Информация из URL'а">
                    <Field title="Система">{systemId}</Field>
                    <Field title="Идентификатор клиента">{clientId}</Field>
                    <Button key="clearClientProfileData"
                            dataId="button-clearClientProfileData"
                            name="Завершить работу с клиентом"
                            onClick={() => {
                                pageRouter.open(FIND_CLIENT_FORM_PAGE_KEY);
                            }}
                    />
                </Fieldset>

                <Button key="forward"
                        dataId="button-forward"
                        name="Создать платеж"
                        onClick={this.createPayment}
                />

                <Button key="to-index"
                        dataId="button-index"
                        name="На дефолтную страницу"
                        onClick={this.goToIndex}
                />
                <Link href="/ib6/client.html" target="_blank" dataId="dbo-link">Анкета ДБО</Link>
            </Panel>
        )
    };

    static propTypes = {
        systemId: PropTypes.string.isRequired,
        clientId: PropTypes.string.isRequired,
    };
}

export default compose(
    ClientDefaultLayout,
    withPageRouter,
)(ClientFormComponent);