import React from 'react';
import TestHelper from '@efr/medservice-react-test'
import Field from './index';
import {Input, Hint} from '../index';

const inputId = "input1";

describe('Field', () => {
    describe('Test render', () => {
        const title = 'Поиск клиента';

        test('Render title  => Control have title', () => {
            let field = TestHelper.render(<Field title={title}/>);

            expect(field.find('.field-title-text').text()).toEqual(title);
            expect(field.find('.red').exists()).toEqual(false);
            expect(field.find('.errors').exists()).toEqual(false);
            expect(field.find('.field-selected').exists()).toEqual(false);
        });
        test('Render hint => Control have hint', () => {
            const hint = 'Текст подсказки.';
            let field = TestHelper.render(<Field title={title} hint={hint}/>);

            expect(field.find(Hint).exists()).toEqual(true);
        });
        test('Field is required  => Field have required attribute', () => {
            let field = TestHelper.render(<Field required/>);

            expect(field.find('.red').exists()).toEqual(true);
        });
        test('Render errors', () => {
            const errors = 'Error text';
            let field = TestHelper.render(<Field error={errors}/>);

            expect(field.find('.errors').exists()).toEqual(true);
            expect(field.find('.errors').text()).toEqual(errors);
        });

        test('Control have error property => Children control have not error', () => {
            const errors = 'Error text';
            let field = TestHelper.render(<Field error={errors}><Input type="text" dataId={inputId}/></Field>);

            expect(field.find(Input).props().error).not.toBeDefined();
        });

        test('Control haven`t error property => Children control haven`t error', () => {
            let field = TestHelper.render(<Field><Input type="text" dataId={inputId}/></Field>);

            expect(field.find(Input).props().error).not.toBeDefined();
        });

        test('Child control haven`t error property => Error property won`t define', () => {
            const SomeComponent = () => <div></div>;
            let field = TestHelper.render(<Field error="Errors text description"><SomeComponent/></Field>);

            expect(field.find(SomeComponent).props().error).not.toBeDefined();
        });
        test('Check render field with error and any child ', () => {
            let field = TestHelper.render(<Field error="Errors text description">Errors text description</Field>);

            expect(field).toBeDefined();
        });
        test('Check render selected field ', () => {
            let field = TestHelper.render(<Field selected>Errors text description</Field>);

            expect(field.find('.field-selected').exists()).toEqual(true);
        });
        test('Check render without title => Control have empty title field ', () => {
            let field = TestHelper.render(<Field>Errors text description</Field>);

            expect(field.find('.field-title-text').text()).toEqual('');
        });
        test('Check render with styled title => Control have styled title ', () => {
            const titleStyle = 'bold';
            let field = TestHelper.render(<Field styleTitle={titleStyle}> </Field>);

            expect(field.find('.field-title-text span').hasClass(titleStyle)).toBePresent();
        });
        test('Control have preset align', () => {
            let field = TestHelper.render(<Field />);

            expect(field.find('.field-title').hasClass('field-title-right')).toBePresent();
        });
        test('Control have align => Control will render width installed align', () => {
            const align = 'left';
            let field = TestHelper.render(<Field align={align}/>);

            expect(field.find('.field-title').hasClass(`field-title-${align}`)).toBePresent();
        });
    });


});