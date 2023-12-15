import React from 'react';
import TestHelper from '@efr/medservice-react-test'
import Form from './index';
import Button from '../button'
import Input from '../input'

const onKeyPressPrimary = jest.fn();
const onKeyPressSecondary = jest.fn();

const inputId = "input1";
const buttonSave = "buttonSave";
const buttonCancel = "buttonCancel";

const formButton = [
    <Button onClick={onKeyPressPrimary} name="Сохранить" dataId={buttonSave}/>,
    <Button onClick={onKeyPressSecondary} type={Button.buttonTypes.secondary} name="Отменить" dataId={buttonCancel}/>
];

const formId = "form1";

const firstError = 'First error';
const secondError = 'Second error';
const errors = [
    firstError,
    secondError
];
const errorsEmpty = [];

describe('Form', () => {
    describe('Test render', () => {

        test('Check default field`s amount attribute => Control default field`s amount attribute', () => {
            let form = TestHelper.render(<Form dataId={formId}/>);

            expect(form.hasClass('field-columns-1')).toEqual(true);
            expect(form.find('.form-buttons').exists()).toEqual(false);
            expect(form.find('.notification').exists()).toEqual(false);
        });
        test('Change field`s amount attribute => Control have field`s amount attribute', () => {
            const fieldColumn = 2;
            let form = TestHelper.render(<Form fieldColumns={fieldColumn} dataId={formId}/>);

            expect(form.hasClass('field-columns-' + fieldColumn)).toEqual(true);
        });
        test('Render form`s button block', () => {
            let form = TestHelper.render(<Form buttons={formButton} dataId={formId}/>);

            expect(form.find('.form-buttons').exists()).toEqual(true);
            expect(form.find(Button).length).toEqual(formButton.length);
        });
        test('Check form content  => Control have content', () => {
            const FormContent = () =>(<div></div>);
            let form = TestHelper.render(<Form dataId={formId}><FormContent/> </Form>);

            expect(form.find(FormContent).exists()).toEqual(true);
        });
        test('Check form identifier', () => {
            let form = TestHelper.render(<Form dataId={formId}/>);

            expect(form.find('.form').prop('data-id')).toEqual(formId);
        });
        test('Check form errors  => Control have error`s block', () => {
            let form = TestHelper.render(<Form dataId={formId} errors={errors}/>);

            expect(form.find('.notification-error').exists()).toEqual(true);
            expect(form.find('.notification-error li').length).toEqual(errors.length);

            for (let i=0; i< errors.length; i++){
                expect(form.find('.notification-error li').at(i).text()).toEqual(errors[i])
            }
        });
        test('Form have empty array of errors  => Control have not error`s block', () => {
            let form = TestHelper.render(<Form dataId={formId} errors={errorsEmpty}/>);

            expect(form.find('.notification-error').exists()).toEqual(false);
        });
        test('Check form warnings  => Control have warning`s block', () => {
            let form = TestHelper.render(<Form dataId={formId} warnings={errors}/>);

            expect(form.find('.notification-warning').exists()).toEqual(true);
            expect(form.find('.notification-warning li').length).toEqual(errors.length);
            for (let i=0; i< errors.length; i++){
                expect(form.find('.notification-warning li').at(i).text()).toEqual(errors[i])
            }
        });
        test('Form have empty array of warnings  => Control have not warning`s block', () => {
            let form = TestHelper.render(<Form dataId={formId} warnings={errorsEmpty}/>);

            expect(form.find('.notification-warning').exists()).toEqual(false);
        });
        test('Check form notice  => Control have notice`s block', () => {
            let form = TestHelper.render(<Form dataId={formId} notice={errors}/>);

            expect(form.find('.notification-notice')).toBePresent();
            expect(form.find('.notification-notice li').length).toEqual(errors.length);
            for (let i=0; i< errors.length; i++){
                expect(form.find('.notification-notice li').at(i).text()).toEqual(errors[i])
            }
        });
        test('Form have empty array of notice  => Control have not notice`s block', () => {
            let form = TestHelper.render(<Form dataId={formId} notice={errorsEmpty}/>);

            expect(form.find('.notification-notice')).not.toBePresent();
        });
    });
    describe('Test onKeyPress', () => {
        test('Control have not buttons, have onKeyPress => onKeyPress fired', () => {
            const onKeyPress = jest.fn();
            let form = TestHelper.render(<Form onKeyPress={onKeyPress} dataId={formId}><Input onChange={()=>{}} dataId={inputId}/></Form>);

            expect(form.find(Input).exists()).toEqual(true);
            form.find(Input).simulate("keyPress", { which: 13 });

            expect(onKeyPress).toBeCalled();
        });
        test('Control have primary and secondary buttons, have not onKeyPress => primary button fired ', () => {
            let form = TestHelper.render(<Form dataId={formId} buttons={formButton}><Input onChange={()=>{}} dataId={inputId}/></Form>);

            form.find(Input).simulate("keyPress", { which: 13 });

            expect(onKeyPressPrimary).toBeCalled();
            expect(onKeyPressSecondary).not.toBeCalled();
        });
         test('Control have 2 primary and 1 secondary buttons, have not onKeyPress => first primary button fired', () => {
             const onClickPrimary = jest.fn();
             const onClickPrimarySecond = jest.fn();
             const onClickSecondary = jest.fn();

             const formTwoPrimaryButton = [
                 <Button onClick={onClickPrimary} name="Сохранить" dataId={buttonSave}/>,
                 <Button onClick={onClickPrimarySecond} name="Применить" dataId={buttonSave}/>,
                 <Button onClick={onClickSecondary} type={Button.buttonTypes.secondary} name="Отменить" dataId={buttonCancel}/>
             ];

            let form = TestHelper.render(<Form dataId={formId} buttons={formTwoPrimaryButton}><Input onChange={()=>{}} dataId={inputId}/></Form>);

            form.find(Input).simulate("keyPress", { which: 13 });

            expect(onClickPrimary).toBeCalled();
            expect(onClickPrimarySecond).not.toBeCalled();
            expect(onClickSecondary).not.toBeCalled();
        });
        test('Control have 1 secondary button and have not onKeyPress => secondary button not fired', () => {

            const formSecondaryButton = [
                <Button onClick={onKeyPressSecondary} type={Button.buttonTypes.secondary} name="Отменить" dataId={buttonCancel}/>
            ];

            let form = TestHelper.render(<Form dataId={formId} buttons={formSecondaryButton}><Input onChange={()=>{}} dataId={inputId}/></Form>);

            expect(form.find(Input).exists()).toEqual(true);
            form.find(Input).simulate("keyPress", { which: 13 });

            expect(onKeyPressSecondary).not.toBeCalled();
        });
        test('Control have primary, secondary buttons and have onKeyPress => onKeyPress fired', () => {
            const onKeyPress = jest.fn();
            const onKeyPressPrimaryLocal = jest.fn();
            const onKeyPressSecondaryLocal= jest.fn();
            const formButtons = [
                <Button onClick={onKeyPressPrimaryLocal} name="Сохранить" dataId={buttonSave}/>,
                <Button onClick={onKeyPressSecondaryLocal} type={Button.buttonTypes.secondary} name="Отменить" dataId={buttonCancel}/>
            ];

            let form = TestHelper.render(<Form dataId={formId} onKeyPress={onKeyPress} buttons={formButtons}><Input onChange={()=>{}} dataId={inputId}/></Form>);

            form.find(Input).simulate("keyPress", { which: 13 });

            expect(onKeyPress).toBeCalled();
            expect(onKeyPressPrimaryLocal).not.toBeCalled();
            expect(onKeyPressSecondaryLocal).not.toBeCalled();
        });
    });

});