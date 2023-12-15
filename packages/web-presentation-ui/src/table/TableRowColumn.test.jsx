import React from 'react';
import TestHelper from '@efr/medservice-react-test'
import {TableRowColumn} from './index';

const TableRowColumnId = "TableRowColumnId";

describe('TableRowColumn', () => {
    describe('Test render', () => {
        test('TableRowColumn render', () => {
            let tableRowColumn = TestHelper.render(
                <table>
                    <thead>
                        <tr>
                            <TableRowColumn dataId={TableRowColumnId}>
                                tableHeader
                            </TableRowColumn>
                        </tr>
                    </thead>
                </table>
            );
            expect(tableRowColumn.find(TableRowColumn).text()).toEqual('tableHeader');
            expect(tableRowColumn.find('td').hasClass('align-left')).toEqual(true);
            expect(tableRowColumn.find('td').hasClass('active-cell')).toEqual(false);
        });

        test('Check align attribute', () => {
            const align = "right";
            let tableRowColumn = TestHelper.render(
                <table>
                    <thead>
                    <tr>
                        <TableRowColumn dataId={TableRowColumnId} align={align}> </TableRowColumn>
                    </tr>
                    </thead>
                </table>
            );
            expect(tableRowColumn.find('td').hasClass(`align-${align}`)).toEqual(true);
        });

        test('Check control`s identifier', () => {
            let tableRowColumn = TestHelper.render(
                <table>
                    <thead>
                    <tr>
                        <TableRowColumn dataId={TableRowColumnId}>
                            tableHeader
                        </TableRowColumn>
                    </tr>
                    </thead>
                </table>
            );

            expect(tableRowColumn.find('td').prop('data-id')).toEqual(TableRowColumnId);
        });

        test('Check style', () => {
            let style = {width : '20px'};
            let tableRowColumn = TestHelper.render(
                <table>
                    <thead>
                    <tr>
                        <TableRowColumn style={style} dataId={TableRowColumnId}>
                            tableHeader
                        </TableRowColumn>
                    </tr>
                    </thead>
                </table>
            );

            expect(tableRowColumn.find('td').props().style).toEqual(style);
        });

        test('Check active attribute', () => {
            let tableRowColumn = TestHelper.render(
                <table>
                    <thead>
                    <tr>
                        <TableRowColumn dataId={TableRowColumnId} active> </TableRowColumn>
                    </tr>
                    </thead>
                </table>
            );
            expect(tableRowColumn.find('td').hasClass('active-cell')).toEqual(true);
        });

        test('Check colspan', () => {
            let tableRowColumn = TestHelper.render(
                <table>
                    <thead>
                    <tr>
                        <TableRowColumn dataId={TableRowColumnId} colSpan={"3"}> </TableRowColumn>
                    </tr>
                    </thead>
                </table>
            );

            expect(tableRowColumn.find('td').prop('colSpan')).toEqual("3");
        });
    });

    describe('onChange',() => {
        test('onClick', () => {
            let click = jest.fn();
            let tableRowColumn = TestHelper.render(
                <table>
                    <thead>
                    <tr>
                        <TableRowColumn onClick={click} dataId={TableRowColumnId}>
                            tableHeader
                        </TableRowColumn>
                    </tr>
                    </thead>
                </table>
            );
            tableRowColumn.find(TableRowColumn).simulate('click');
            expect(click).toHaveBeenCalled();
        })
    });
});