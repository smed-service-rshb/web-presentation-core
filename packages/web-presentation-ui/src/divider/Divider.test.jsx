import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import Divider from './index';

describe('Divider', () => {
    describe('Test render', () => {
        test('Render component ', () => {
            let divider = TestHelper.render(<Divider/>);

            expect(divider.exists()).toEqual(true);
            expect(divider.hasClass('clear')).toEqual(false);
            expect(divider.find('.divider-description').exists()).toEqual(false);
            expect(divider.find('.divider-border').hasClass('divider-border-text')).toEqual(false);
            expect(divider.hasClass('divider-default')).toEqual(true);
        });
        test('Render description', () => {
            const description= "description";
            let divider = TestHelper.render(<Divider description={description}/>);

            expect(divider.find('.divider-description').exists()).toEqual(true);
            expect(divider.find('.divider-description').text()).toEqual(description);
            expect(divider.find('.divider-border').hasClass('divider-border-text')).toEqual(true);
        });
        test('Check control type => Control have installed type ', () => {
            const type = "incomplete";
            let divider = TestHelper.render(<Divider type={type}/>);

            expect(divider.hasClass(`divider-${type}`)).toEqual(true);
        });
    });
});