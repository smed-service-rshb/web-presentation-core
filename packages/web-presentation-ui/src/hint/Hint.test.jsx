import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import Hint from './index';

describe('Hint', () => {
    describe('Test render', () => {
        test('Control haven`t name attribute => Control will be render with default icon', () => {
            const hintContent = 'Hint content';
            let hint = TestHelper.render(<Hint>{hintContent}</Hint>);

            expect(hint.find('.hint-icon').exists()).toEqual(true);
            expect(hint.find('.hint-container-title').text()).toEqual('');
            expect(hint.find('.hint-container-title-undotted')).not.toBePresent();
        });
        test('Control have name attribute => Control will be render name', () => {
            const hintContent = 'Hint content';
            const name = 'name';
            let hint = TestHelper.render(<Hint name={name}>{hintContent}</Hint>);

            expect(hint.find('.hint-icon').exists()).toEqual(false);
            expect(hint.find('.hint-container-title').text()).toEqual(name);
        });
        test('Control have unDotted attribute => Control will be render without dotted name', () => {
            const hintContent = 'Hint content';
            const name = 'name';
            let hint = TestHelper.render(<Hint name={name} unDotted>{hintContent}</Hint>);

            expect(hint.find('.hint-container-title-undotted')).toBePresent(true);
        });
    });

});