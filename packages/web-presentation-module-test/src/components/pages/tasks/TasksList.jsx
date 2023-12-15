import React from 'react';
import {compose, withActions, withPageRouter, withModals} from '@efr/medservice-web-presentation-core';
import {Button, Grid, Panel} from '@efr/medservice-web-presentation-ui';
import {TasksListAction} from '../../../actions/index'

const columns = [
    {key: 'id', name: ""},
    {key: 'name', name: "Процесс"},
    {key: 'client', name: "Клиент"},
    {key: 'step', name: "Задача"},
    {key: 'date', name: "Дата"},
    {key: 'control', name: ""},
];


class TasksListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.dataSource = Grid.createDataSource(this._getData);
        this.state = {}
    }

    _getData = (...params) => {
        return this.props.actions.list(...params)
            .then(data => ({
                rows: data,
                hasMore: false
            }))
            .catch(({message}) => {
                this.setState({error: message})
            })
    };

    _goBack = () => {
        this.props.pageRouter.back()
    };

    _goToTask = rowData => {
        this.props.modals.alert({message: `Переход к задаче ${JSON.stringify(rowData, null, 2)}`});
    };

    render = () => {
        return (
            <Panel label="Мои задачи" dataId="tasks-list-panel">
                {
                    this.state.error &&
                    <div id="error">{this.state.error}</div>
                }
                {
                    !this.state.error &&
                    <Grid dataSource={this.dataSource} columns={columns} onCellClick={this._goToTask}
                          dataId="tasks-grid"
                          emptyMessage="Нет данных"
                    />
                }
                <Button key="back"
                        dataId="button-tasks-back"
                        name="Назад"
                        onClick={this._goBack}
                />
            </Panel>
        )
    };
}

export default compose(
    withPageRouter,
    withActions({
        list: TasksListAction.name,
    }),
    withModals()
)(TasksListComponent)