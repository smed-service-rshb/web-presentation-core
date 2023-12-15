import React from 'react';
import PropTypes from 'prop-types';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from '../table';

export default class Spreadsheet extends React.Component {

    constructor(props) {
        super(props);
        this.columns = this.props.columns.map(column => {
            let name = column.name;

            if (typeof name === 'string' || column.name instanceof String) {
                name = () => column.name;
            }

            let data = column.data;
            if (typeof data === "undefined"){
                data = row=> row[column.key];
            }
            return {
                ...column,
                name,
                data
            }
        })
    }


    render = () => {
        const {rows} = this.props;
        return (
            <div>
                <Table>
                    <TableHeader>
                        <TableRow dataId={this.props.dataId + '-TableRow'}>
                            {this.columns.map(column => <TableHeaderColumn style={column.headerStyle} key={column.key}
                                                                           dataId={this.props.dataId + '-TableHeaderColumn-' + column.key}>{column.name()}</TableHeaderColumn>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row, index) =>
                            <TableRow key={index} dataId={this.props.dataId + '-TableRow-' + index}>
                                {this.columns.map(column =>
                                    <TableRowColumn key={column.key + index} style={column.cellStyle}
                                                    dataId={this.props.dataId + '-TableRowColumn-' + column.key}>
                                        {column.data(row, index)}
                                    </TableRowColumn>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        )
    };

    static propTypes = {

        columns: PropTypes.arrayOf(
            PropTypes.shape({
                /**
                 * Ключ колонки
                 */
                key: PropTypes.string.isRequired,

                /**
                 * Наименование колонки, отображаемое пользовалтелю
                 */
                name: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.func
                ]).isRequired,

                /**
                 * Функция рендера содержимого BodyTable
                 */
                data: PropTypes.func,

                /**
                 * Стиль ячейки заголовка
                 */
                headerStyle: PropTypes.object,

                /**
                 * Стиль ячейки
                 */
                cellStyle: PropTypes.object

            }),
        ).isRequired,

        /**
         * Массив с данными
         */
        rows: PropTypes.array,

        /**
         * Уникальный идентификатор
         */
        dataId: PropTypes.string.isRequired,

    }
}