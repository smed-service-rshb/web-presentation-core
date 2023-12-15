import React from 'react';
import {compose, withActions, withPageRouter} from '@efr/medservice-web-presentation-core';
import {Button, Grid, Link, Panel} from '@efr/medservice-web-presentation-ui';
import {EntitiesListAction} from '../../../actions/index'
import {CREATE_PAGE_KEY, EDIT_PAGE_KEY} from '../page-keys'

const columns = [
    {key: 'id', name: "Идентификатор сущности"},
    {key: 'name', name: "Наименование сущности"},
];


class EntitiesListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.dataSource = Grid.createDataSource(this._getData);
        this.state = {}
    }

    _goBack = () => {
        this.props.pageRouter.back()
    };

    _goEntity = rowData => {
        this.props.pageRouter.open(EDIT_PAGE_KEY, rowData)
    };

    _createEntity = () => {
        this.props.pageRouter.open(CREATE_PAGE_KEY)
    };

    render = () => {
        return (
            <Panel label="EntitiesList" dataId="entities-list-panel">
                {
                    this.state.error &&
                    <div id="error">{this.state.error}</div>
                }
                {
                    !this.state.error &&
                    <Grid dataSource={this.dataSource} columns={columns} onCellClick={this._goEntity}
                          dataId="entities-grid"
                          emptyMessage="Нет данных"
                    >
                        <Link onClick={this._createEntity} dataId="entities-list-add-link">Добавить</Link>
                    </Grid>
                }
                <Button key="back"
                        dataId="button-back"
                        name="Назад"
                        onClick={this._goBack}
                />
            </Panel>
        )
    };

    _getData = (...params) => {
        return this.props.actions.list(...params)
            .then(data => ({
                rows: data,
                //TODO pagination
                hasMore: false
            }))
            .catch(({message}) => {
                this.setState({error: message})
            })
    };
}

export default compose(
    withPageRouter,
    withActions({
        list: EntitiesListAction.name,
    })
)(EntitiesListComponent)