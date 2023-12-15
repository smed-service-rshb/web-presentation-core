import React from 'react';
import TestHelper from '@efr/medservice-react-test'
import {TableBody} from './index';


describe('TableBody', () => {
    describe('Test render', () => {
        test('TableBody render', () => {
            let tableBody = TestHelper.render(
                <table>
                    <TableBody>
                        <tr>
                            <td>
                                tableBody
                            </td>
                        </tr>
                    </TableBody>
                </table>
            );
            expect(tableBody.find(TableBody).text()).toEqual('tableBody');
        });
    });
});