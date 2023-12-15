import React from 'react';
import TestHelper from '@efr/medservice-react-test'
import {TableHeaderColumn} from './index';

const tableHeaderColumnId = "tableHeaderColumnId";

describe('TableHeaderColumn', () => {
    describe('Test render', () => {
        test('TableHeaderColumn render', () => {
            let tableHeaderColumn = TestHelper.render(
                <table>
                    <thead>
                        <tr>
                            <TableHeaderColumn dataId={tableHeaderColumnId}>
                                tableHeader
                            </TableHeaderColumn>
                        </tr>
                    </thead>
                </table>
            );
            expect(tableHeaderColumn.find(TableHeaderColumn).text()).toEqual('tableHeader');
            expect(tableHeaderColumn.find('th').hasClass('active')).toEqual(false);
        });

        test('Check control`s identifier', () => {
            let tableHeaderColumn = TestHelper.render(
                <table>
                    <thead>
                    <tr>
                        <TableHeaderColumn dataId={tableHeaderColumnId}>
                            tableHeader
                        </TableHeaderColumn>
                    </tr>
                    </thead>
                </table>
            );

            expect(tableHeaderColumn.find('.col-title').prop('data-id')).toEqual(tableHeaderColumnId);
        });
        test('Check style', () => {
            let style = {textAlign : 'center'};
            let tableHeaderColumn = TestHelper.render(
                <table>
                    <thead>
                    <tr>
                        <TableHeaderColumn style={style} dataId={tableHeaderColumnId}>
                            tableHeader
                        </TableHeaderColumn>
                    </tr>
                    </thead>
                </table>
            );

            expect(tableHeaderColumn.find('th').props().style).toEqual(style);
        });
        test('Check active attribute', () => {
            let tableHeaderColumn = TestHelper.render(
                <table>
                    <thead>
                    <tr>
                        <TableHeaderColumn dataId={tableHeaderColumnId} active>
                            tableHeader
                        </TableHeaderColumn>
                    </tr>
                    </thead>
                </table>
            );

            expect(tableHeaderColumn.find('th').hasClass('active')).toEqual(true);
        });
        test('Check colspan', () => {
            let tableHeaderColumn = TestHelper.render(
                <table>
                    <thead>
                    <tr>
                        <TableHeaderColumn dataId={tableHeaderColumnId} colSpan="3" active>
                            tableHeader
                        </TableHeaderColumn>
                    </tr>
                    </thead>
                </table>
            );

            expect(tableHeaderColumn.find('th').prop('colSpan')).toEqual("3");
        });
    });

    describe('onChange',() => {
        test('onClick', () => {
            let click = jest.fn();
            let tableHeaderColumn = TestHelper.render(
                <table>
                    <thead>
                    <tr>
                        <TableHeaderColumn onClick={click} dataId={tableHeaderColumnId}>
                            tableHeader
                        </TableHeaderColumn>
                    </tr>
                    </thead>
                </table>
            );
            tableHeaderColumn.find(TableHeaderColumn).simulate('click');
            expect(click).toHaveBeenCalled();
        })
    });
});