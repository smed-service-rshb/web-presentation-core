import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import Label from './index';

describe('Label', () => {
    describe('Test render', () => {
        test('Render with content ', () => {
            const hintContent = 'label content';
            let label = TestHelper.render(<Label>{hintContent}</Label>);

            expect(label.text()).toEqual(`${hintContent}`);
        });
    });

});