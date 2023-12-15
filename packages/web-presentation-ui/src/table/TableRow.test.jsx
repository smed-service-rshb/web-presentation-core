import React from 'react';
import TestHelper from '@efr/medservice-react-test'
import {TableRow} from './index';

const MockComponent = () => <td>tableHeader</td>;
const tableRowId = "tableRowId";

describe('TableRow', () => {
    describe('Render', () => {
        test('TableRow render', () => {
            let tableRow = TestHelper.render(
                <table>
                    <thead>
                        <TableRow dataId={tableRowId}>
                            <MockComponent/>
                        </TableRow>
                    </thead>
                </table>
            );
            expect(tableRow.find(TableRow).text()).toEqual('tableHeader');
        });

        test('Check control`s identifier', () => {
            let tableRow = TestHelper.render(
                <table>
                    <thead>
                    <TableRow dataId={tableRowId}>
                        <MockComponent/>
                    </TableRow>
                    </thead>
                </table>
            );

            expect(tableRow.find('tr').prop('data-id')).toEqual(tableRowId);
        });
    });

    describe('onChange',() => {
        test('onClick', () => {
            let click = jest.fn();
            let tableRow = TestHelper.render(
                <table>
                    <thead>
                        <TableRow onClick={click} dataId={tableRowId}>
                        </TableRow>
                    </thead>
                </table>
            );
            tableRow.find(TableRow).simulate('click');
            expect(click).toHaveBeenCalled();
        })
    });
});