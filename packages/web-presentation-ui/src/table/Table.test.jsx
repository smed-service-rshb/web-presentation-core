import React from 'react';
import TestHelper from '@efr/medservice-react-test'
import {Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn} from './index';

const tableRowId = "tableRowId";
const tableHeaderColumnId = "tableHeaderColumnId";
const tableRowColumnId = "TableRowColumnId";

describe('Table', () => {
    describe('Render', () => {
        test('Table Render', () => {
            let table = TestHelper.render(
                <Table>
                    <TableHeader>
                        <TableRow dataId={tableRowId}>
                            <TableHeaderColumn dataId={tableHeaderColumnId}>
                                1
                            </TableHeaderColumn>
                            <TableHeaderColumn dataId={tableHeaderColumnId}>
                                2
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow dataId={tableRowId}>
                            <TableRowColumn dataId={tableRowColumnId}>
                                Первая строка первого столбца
                            </TableRowColumn>
                            <TableRowColumn dataId={tableRowColumnId}>
                                Первая строка второго столбца
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            );

            let tableHeader = table.find(TableHeader);
            expect(tableHeader.exists()).toEqual(true);

            let tableRow = tableHeader.find(TableRow);
            expect(tableRow.exists()).toEqual(true);

            let tableHeaderColumn = tableRow.find(TableHeaderColumn);
            expect(tableHeaderColumn.length).toEqual(2);

            let tableBody = table.find(TableBody);
            expect(tableBody.exists()).toEqual(true);

            let tableRowColumn = tableBody.find(TableRowColumn);
            expect(tableRowColumn.length).toEqual(2);

            expect(table.find('.table-wrap').props().style.width).toEqual('100%');
        });

        test('Table Render with net prop', () => {
            let table = TestHelper.render(
                <Table net="vertical">
                    <TableHeader>
                        <TableRow dataId={tableRowId}>
                            <TableHeaderColumn dataId={tableHeaderColumnId}>
                                1
                            </TableHeaderColumn>
                            <TableHeaderColumn dataId={tableHeaderColumnId}>
                                2
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow dataId={tableRowId}>
                            <TableRowColumn dataId={tableRowColumnId}>
                                Первая строка первого столбца
                            </TableRowColumn>
                            <TableRowColumn dataId={tableRowColumnId}>
                                Первая строка второго столбца
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            );

            expect(table.find('.table').hasClass('vertical')).toEqual(true);

        });

        test('Table Render with installed width', () => {
            let width = 'auto';
            let table = TestHelper.render(
                <Table width={width}>
                    <TableBody>
                        <TableRow dataId={tableRowId}>
                            <TableRowColumn dataId={tableRowColumnId}>Первая строка первого столбца</TableRowColumn>
                            <TableRowColumn dataId={tableRowColumnId}>Первая строка второго столбца</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            );

            expect(table.find('.table-wrap').props().style.width).toEqual(width)
        });
    });

    describe('onClick', () => {
        test('TableRow and TableRowColumn onClick', () => {
            let click = jest.fn();
            let sec_click = jest.fn();
            let table = TestHelper.render(
                <Table>
                    <TableHeader>
                        <TableRow dataId={tableRowId}>
                            <TableHeaderColumn dataId={tableHeaderColumnId}>
                                1
                            </TableHeaderColumn>
                            <TableHeaderColumn dataId={tableHeaderColumnId}>
                                2
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow onClick={click} dataId={tableRowId}>
                            <TableRowColumn onClick={sec_click} dataId={tableRowColumnId}>
                                Первая строка первого столбца
                            </TableRowColumn>
                            <TableRowColumn dataId={tableRowColumnId}>
                                Первая строка второго столбца
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            );

            let tableBody = table.find(TableBody);
            let tableRow = tableBody.find(TableRow);
            let tableRowColumn = tableRow.find(TableRowColumn).first();

            tableRowColumn.simulate('click');
            expect(click).toHaveBeenCalled();
            expect(sec_click).toHaveBeenCalled();
        });
    });
});