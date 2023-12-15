import React, {Component} from 'react';

import {
    withActions,
    withPageRouter,
    compose,
} from '@efr/medservice-web-presentation-core';
import {
    Button,
    Panel,
    Grid,
} from '@efr/medservice-web-presentation-ui';

import {
    CLIENT_FORM_PAGE_KEY,
    NEW_CLIENT_FORM_PAGE_KEY,
} from '../page-keys'


const columns = [
    {key: 'clientId', name: "Идентификатор клиента"},
    {key: 'systemId', name: "Идентификатор системы клиента"},
    {key: 'name', name: "Имя клиента"},
];

class FindClientFormComponent extends Component {
    constructor(props) {
        super(props);
        this.dataSource = Grid.createDataSource(this._getData);
    }
    _getData = (...params) => {
        return Promise.resolve(this.props.actions.list(params))
            .then(data => ({
                rows: data,
                hasMore: false
            }));
    };

    _goEntity = ({clientId, systemId}) => {
        this.props.pageRouter.open(CLIENT_FORM_PAGE_KEY, {clientId, systemId});
    };

    createClient = () => {
        this.props.pageRouter.open(NEW_CLIENT_FORM_PAGE_KEY);
    };

    render = () => {
        return (
            <Panel dataId="client-form-panel" label="Поиск клиента">
                <Button key="createClient"
                        dataId="button-createClient"
                        name="Новый клиент"
                        onClick={this.createClient}
                />

                <Grid dataSource={this.dataSource} columns={columns} onCellClick={this._goEntity}
                      dataId="entities-grid"
                      emptyMessage="Нет данных"
                />
             </Panel>
        )
    }
}

export default compose(
    withPageRouter,
    withActions({
        list: 'clients.List',
    }),
)(FindClientFormComponent);