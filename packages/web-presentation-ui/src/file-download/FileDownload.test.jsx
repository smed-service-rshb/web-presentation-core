import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import FileDownload from './index';

const name = "name";
const action = "action";

describe('FileDownload', () => {
    describe('Test render', () => {
        test('Check the FileDownload was rendered  => Control is render', () => {
            const fileDownload = TestHelper.render(<FileDownload dataId={'fileDownload'}
                                                                 name={name}
                                                                 action={action}
            />);

            expect(fileDownload.hasClass('download-filename')).toEqual(true);
            expect(fileDownload.hasClass('disabled')).toEqual(false);
        });
        test('Control have disabled attribute => Control will be disabled', () => {
            const fileDownload = TestHelper.render(<FileDownload dataId={'fileDownload'} name={name} action={action} disabled/>);

            expect(fileDownload.hasClass('disabled')).toEqual(true);
        });
    });
});