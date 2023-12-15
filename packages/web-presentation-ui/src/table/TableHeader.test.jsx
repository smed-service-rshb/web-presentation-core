import React from 'react';
import TestHelper from '@efr/medservice-react-test'
import {TableHeader} from './index';

const MockComponent = () =><tr><td>tableHeader</td></tr>


describe('TableHeader', () => {
    describe('Test render', () => {
        test('TableHeader render', () => {
            let tableHeader = TestHelper.render(
                <table>
                    <TableHeader>
                        <MockComponent/>
                    </TableHeader>
                </table>
            );
            expect(tableHeader.find(TableHeader).text()).toEqual('tableHeader');
        });
    });
});