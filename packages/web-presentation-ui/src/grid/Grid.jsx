import React from 'react';
import PropTypes from 'prop-types';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from '../table';

import Checkbox from '../checkbox';

import Paginator from './Paginator';
import DataSource from './data-source';
import SpringPageableDataSource from "./spring-pageable-data-source";

class Grid extends React.Component {
    state = {};

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount = () => {
        this.unlisten = this.props.dataSource.listen(
            data => this.setState({
                ...this.state,
                hasMore: data.hasMore,
                rows: data.rows && data.rows.map(item => {
                    return {
                        item: item,
                        selected: false
                    }
                })
            })
        );

        this.props.dataSource.load()
    };

    componentWillUnmount = () => {
        this.unlisten()
    };

    _onCellClick = (rowData, columnKey, e) => {
        e.preventDefault();
        this.props.onCellClick && this.props.onCellClick(rowData, columnKey)
    };

    _switchSelection = (elementIndex, selected) => {
        this.setState({
            ...this.state,
            rows: this.state.rows.map((item, index) => {
                return {
                    ...item,
                    selected: (elementIndex === index) ? selected : item.selected
                }
            })
        })

    };

    _switchSelectionAll = selected => {
        this.setState({
            ...this.state,
            rows: this.state.rows.map(item => {
                return {
                    ...item,
                    selected: selected
                }
            })
        })
    };

    getSelectedRows = () => {
        const {rows} = this.state;
        return (rows && rows.filter(item => item.selected).map(item => item.item)) || []
    };

    getAllRows = () => {
        const {rows} = this.state;
        return (rows && rows.map(item => item.item)) || []
    };

    refresh = () => {
        this.props.dataSource.load();
    };

    render = () => {
        const {dataSource} = this.props;

        const columns = this.props.columns.map(item => ({
            ...item,
            data: (data, _item) => (item.data && item.data(data, _item)) || data
        }));

        if (!columns) {
            console.error("Грид без столбцов бессмысленен");
            return null
        }
        const {rows, hasMore} = this.state;

        if (!rows) {
            return null;
        }

        if (dataSource.getPage() === 1 && rows.length === 0) {
            return <div className="grid-empty-message">{this.props.emptyMessage}</div>
        }

        const allSelected = this.getSelectedRows().length === this.getAllRows().length;

        return (
            <div>
                <div className="grid" data-id={this.props.dataId}>
                    {this._renderToolbar()}
                    <Table maxHeight={this.props.maxHeight}>
                        <TableHeader>
                            <TableRow dataId={this.props.dataId + '-gridTableHeaderRow'}>
                                {
                                    !this.props.checkboxDisabled &&
                                    <TableHeaderColumn
                                        dataId={this.props.dataId + '-gridTableHeaderColumnCommonCheckbox'}>
                                        <Checkbox onChange={this._switchSelectionAll} checked={allSelected}
                                                  dataId={this.props.dataId + '-gridHeaderCheckbox'}/>
                                    </TableHeaderColumn>
                                }
                                {
                                    columns.map(column => (
                                        <TableHeaderColumn key={column.key}
                                                           dataId={this.props.dataId + '-gridTableHeaderColumnRow-' + column.key}>
                                            {column.name}
                                        </TableHeaderColumn>)
                                    )
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                rows.map((row, index) => (
                                    <TableRow key={index} dataId={this.props.dataId + '-gridTableRow-' + index}>
                                        {
                                            !this.props.checkboxDisabled &&
                                            <TableRowColumn dataId={this.props.dataId + '-gridTableRowColumn-' + index}>
                                                <Checkbox onChange={this._switchSelection.bind(this, index)}
                                                          checked={row.selected}
                                                          dataId={this.props.dataId + '-gridCheckboxRow-' + index}/>
                                            </TableRowColumn>
                                        }
                                        {
                                            columns.map(column => (
                                                <TableRowColumn key={column.key + index}
                                                                onClick={this._onCellClick.bind(this, row.item, column.key)}
                                                                dataId={this.props.dataId + '-gridTableRowColumn-' + column.key}>
                                                    {column.data(row.item[column.key], row.item)}
                                                </TableRowColumn>
                                            ))
                                        }
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
                <Paginator page={dataSource.getPage()}
                           size={dataSource.getSize()}
                           hasMore={hasMore}
                           onPageChange={dataSource.changePage}
                           onSizeChange={dataSource.changeSize}
                />
            </div>
        )
    };

    _renderToolbar = () => {
        return (
            <div className="grid-buttons">
                {
                    React.Children.toArray(this.props.children).map(child => (
                        React.cloneElement(child, {
                            onClick: () => child.props.onClick(this.getSelectedRows())
                        })
                    ))
                }
            </div>
        )

    };


    static propTypes = {
        /**
         * Список колонок грида
         */
        columns: PropTypes.arrayOf(
            PropTypes.shape({
                /**
                 * Ключ колонки
                 */
                key: PropTypes.string.isRequired,
                /**
                 * Наименование колонки, отображаемое пользовалтелю
                 */
                name: PropTypes.string.isRequired,

                /**
                 * Функция рендера содержимого ячейки. Передаются два параметра:
                 *      данные ячейки,
                 *      данные строки;
                 */
                data: PropTypes.func,
            })
        ).isRequired,

        /**
         * Дочерние элементы, являющиеся реакт элементами IconButton.
         * Вставляются в toolbar грида
         */
        children: PropTypes.node,

        /**
         * Источник данных
         *
         */
        dataSource: PropTypes.shape({
            /**
             * Подписаться на события получения данных
             * //TODO описать
             * Возвращаемое значение:
             *    функция отписки
             */
            listen: PropTypes.func.isRequired,
        }).isRequired,

        /**
         * Функция обработки клика на ячейку таблицы
         *      function onCellClick (rowData, columnKey)
         */
        onCellClick: PropTypes.func,

        /**
         * Сообщение, оботражаемое при отсутствии данных.
         */
        emptyMessage: PropTypes.string,
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,
        /**
         * Максимальная высота в px
         */
        maxHeight: PropTypes.string,
        /**
         * Признак отображения чекбоксов
         */
        checkboxDisabled: PropTypes.bool

    };

    static defaultProps = {
        checkboxDisabled: false
    };

    static createDataSource = (...params) => new DataSource(...params);
    static createSpringPageableDataSource = (...params) => new SpringPageableDataSource(...params);
}

export default Grid

//TODO Покрыть тестами
