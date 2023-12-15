import React from 'react';

import TestHelper from '@efr/medservice-react-test'

import Badge from './index';

describe('Badge', () => {
    describe('Test render', () => {
        test('Render with number content ', () => {
            const hintContent = 10;
            let badge = TestHelper.render(<Badge>{hintContent}</Badge>);

            expect(badge.text()).toEqual(`${hintContent}`);
        });
    });

});