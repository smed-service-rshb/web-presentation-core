import React, {Component} from 'react';

import {
    withActions,
    withPageRouter,
    compose,
    PropTypes,
} from '@efr/medservice-web-presentation-core';

import {
    Button,
    Field,
    Fieldset,
    Panel,
} from '@efr/medservice-web-presentation-ui';

import {FIND_CLIENT_FORM_PAGE_KEY} from "../page-keys";

import {ClientManuallySetupMenuDataLayout} from "./layout";


const ViewProductForm = productType => class ViewProductForm extends Component {
    static propTypes = {
        productId: PropTypes.number.isRequired,
        systemId: PropTypes.string.isRequired,
        clientId: PropTypes.number.isRequired,
    };

    state = {};

    componentDidMount = () => {
        this._loadClientData();
    };

    _loadClientData = () => {
        const {actions, setLayoutData, clientId, systemId, productId} = this.props;

        actions.loadClientData({clientId, systemId, productId})
            .then(data => {
                this.setState({...data.productInfo, success: true});
                setLayoutData({
                    systemId: data.clientInfo.systemId,
                    clientId: data.clientInfo.clientId,
                });
            })
            .catch(e => {
                this.setState({error: e, success: false});
            });
    };

    render = () => {
        const {success} = this.state;
        if (success === undefined) {
            return null;
        }

        if (!success) {
            return <div>{this.state.error.message}</div>;
        }

        const {pageRouter} = this.props;
        const {clientId, systemId, productId} = this.state;


        return <Panel
            dataId="client-product-panel"
            label={`Анкета продукта (${productType})`}>
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
            <Field title="Идентификатор продукта">{productId}</Field>
        </Panel>
    }
};

export default productType => compose(
    ClientManuallySetupMenuDataLayout,
    withActions({
        loadClientData: 'clients.FullProductInfoAction',
    }),
    withPageRouter,
)(ViewProductForm(productType));
