import React from 'react';
import TestHelper from '@efr/medservice-react-test'
import Fieldset from './index';

describe('Fieldset', () => {
    describe('Test render', () => {
        const fieldset = TestHelper.render(<Fieldset/>);
        const title = 'Поиск клиента';
        const subtitle = TestHelper.render(<Fieldset subtitle={title}/>);

        test('Render title  => Control have title', () => {
            let fieldset = TestHelper.render(<Fieldset title={title}/>);
            expect(fieldset.find('.fieldset-legend').exists()).toEqual(true);
            expect(fieldset.find('.fieldset-legend').text()).toEqual(title);
        });
        test('Check hav`t title => Title won`t render', () => {
            expect(fieldset.find('.fieldset-legend').exists()).toEqual(false);
        });
        test('Render subtitle  => Control have subtitle', () => {
            expect(subtitle.find('.fieldset-subtitle').exists()).toEqual(true);
            expect(subtitle.find('.fieldset-subtitle').text()).toEqual(title);
        });
        test('Control haven`t subtitle => Subtitle won`t render', () => {
            expect(fieldset.find('.fieldset-subtitle').exists()).toEqual(false);
        });
        test('Check fieldset content  => Control have content', () => {
            const FieldsetContent = () =>(<div></div>);
            let fieldset = TestHelper.render(<Fieldset><FieldsetContent/></Fieldset>);
            expect(fieldset.find('.fieldset-content').exists()).toEqual(true);
            expect(fieldset.find(FieldsetContent).exists()).toEqual(true);
        });
        test(' haven`t border attribute  => Control will render without border', () => {
            expect(fieldset.find('.fieldset-container-border-none')).toBePresent();
        });
        test('Control haven`t border attribute  => Control will render with border', () => {
            const border = "dotted";
            let fieldset = TestHelper.render(<Fieldset border={border}/>);
            expect(fieldset.find(`.fieldset-container-border-${border}`)).toBePresent();
        });
        test('Control preset column attribute', () => {
            const column = 1;
            expect(fieldset.hasClass(`field-columns-${column}`)).toBePresent();
        });
        test('Control custom column attribute', () => {
            const column = 2;
            let fieldset = TestHelper.render(<Fieldset column={column}/>);
            expect(fieldset.hasClass(`field-columns-${column}`)).toBePresent();
        });
    });
});