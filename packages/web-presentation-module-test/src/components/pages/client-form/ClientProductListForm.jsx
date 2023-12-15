import React from 'react';

import {
    PropTypes,
    withActions,
    withPageRouter,
    compose,
} from '@efr/medservice-web-presentation-core';
import {
    Grid,
    Panel,
} from '@efr/medservice-web-presentation-ui';

import {
    CLIENT_ACCOUNT_PRODUCT_FORM_PAGE_KEY,
    CLIENT_CARD_PRODUCT_FORM_PAGE_KEY,
} from '../page-keys'

import {buildClientProfileInfo} from './ViewClientForm'

import {ClientDefaultLayout} from "./layout";


const columns = [
    {key: 'clientId', name: "Идентификатор клиента"},
    {key: 'systemId', name: "Идентификатор системы клиента"},
    {key: 'productId', name: "Идентификатор продукта"},
    {key: 'productType', name: "Тип продукта"},
];

const types = {
    account: (pageRouter, clientProductData, data) => {
        pageRouter.open(CLIENT_ACCOUNT_PRODUCT_FORM_PAGE_KEY, data);
    },
    card: (pageRouter, clientProductData, data) => {
        pageRouter.open(CLIENT_CARD_PRODUCT_FORM_PAGE_KEY, data);
    },
};

class ClientProductListForm extends React.Component {
    static propTypes = {
        systemId: PropTypes.string.isRequired,
        clientId: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.dataSource = Grid.createDataSource(this._getData);
    }

    _goEntity = ({clientId, systemId, productId, productType}) => {
        const {clientProductData, pageRouter} = this.props;
        types[productType](pageRouter, clientProductData, {clientId, systemId, productId});
    };

    _getData = (...params) => {
        const {actions, clientId, systemId} = this.props;
        return Promise.resolve(actions.list({clientId, systemId}, params))
            .then(data => ({
                rows: data,
                hasMore: false
            }));
    };

    render = () => {
        return (
            <Panel dataId="client-form-panel" label="Продукты клиента">
                {buildClientProfileInfo(this.props)}
                <Grid dataSource={this.dataSource} columns={columns} onCellClick={this._goEntity}
                      dataId="entities-grid"
                      emptyMessage="Нет данных"
                />
            </Panel>
        )
    };
}

export default compose(
    ClientDefaultLayout,
    withPageRouter,
    withActions({
        list: 'client-products.List',
    }),
)(ClientProductListForm);