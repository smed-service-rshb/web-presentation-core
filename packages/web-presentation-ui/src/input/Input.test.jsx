import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import Input from './index';

const inputId = "input1";

describe('Input', () => {
    const inputType = 'text';
    describe('Test render', () => {
        test('Check default value ', () => {
            const itemValue = 'First summer day';
            const input = TestHelper.render(<Input value={itemValue} dataId={inputId}/>);

            expect(input.getDOMNode().value).toEqual(itemValue);
            expect(input.getDOMNode().type).toEqual(inputType);
            expect(input.getDOMNode().tabIndex).toEqual(0);
        });

        test('Check int value ', () => {
            const itemValue = 42;
            const input = TestHelper.render(<Input value={itemValue} dataId={inputId}/>);

            expect(parseInt(input.getDOMNode().value, 10)).toEqual(itemValue);
        });

        test('Check float value ', () => {
            const itemValue = 3.1415;
            const input = TestHelper.render(<Input value={itemValue} dataId={inputId}/>);

            expect(parseFloat(input.getDOMNode().value)).toEqual(itemValue);
        });


        test('Check input type ', () => {
            const input = TestHelper.render(<Input type={inputType} dataId={inputId}/>);

            expect(input.getDOMNode().type).toEqual(inputType);
        });

        test('Check placeholder render ', () => {
            const placeholderHint = 'Text field';
            const input = TestHelper.render(<Input type={inputType} placeholder={placeholderHint} dataId={inputId}/>);

            expect(input.getDOMNode().placeholder).toEqual(placeholderHint);
        });

        test('Check errors render ', () => {
            const input = TestHelper.render(<Input error type={inputType} dataId={inputId}/>);

            expect(input.hasClass('input-error')).toEqual(true);
        });

        test('Change props string value ', () => {
            const value = 'First summer day';
            const input = TestHelper.render(<Input type={inputType} dataId={inputId}/>);
            input.setProps({value});

            expect(input.getDOMNode().defaultValue).toEqual(value);
        });

        test('Change props int value ', () => {
            const value = 42;
            const input = TestHelper.render(<Input type={inputType} dataId={inputId}/>);
            input.setProps({value});

            expect(parseInt(input.getDOMNode().defaultValue, 10)).toEqual(value);
        });

        test('Change props float value ', () => {
            const value = 3.1415;
            const input = TestHelper.render(<Input type={inputType} dataId={inputId}/>);
            input.setProps({value});

            expect(parseFloat(input.getDOMNode().defaultValue)).toEqual(value);
        });

        test('Check tabIndex value ', () => {
            const tabIndex = 2;
            const input = TestHelper.render(<Input type={inputType} tabIndex={tabIndex} dataId={inputId}/>);

            expect(input.getDOMNode().tabIndex).toEqual(tabIndex);
        });

        test('Check control`s identifier ', () => {
            const tabIndex = 2;
            const input = TestHelper.render(<Input type={inputType} tabIndex={tabIndex} dataId={inputId}/>);

            expect(input.find(Input).prop('dataId')).toEqual(inputId);
        });

        test('Control default width => Control have width', () => {
            const controlWidth = "20%";
            const input = TestHelper.render(<Input dataId={inputId} width={controlWidth}/>);

            expect(input.getDOMNode().style.width).toEqual(controlWidth);
        });

        test('Control without mask  => Control have not mask', () => {
            const input = TestHelper.render(<Input dataId={inputId}/>);

            expect(input.getDOMNode().placeholder).not.toBePresent();
        });

        test('Control with mask and placeholder  => Control have placeholder', () => {
            const placeholder = "placeholder";
            const mask = [/\d/, /\d/, '/', /\d/, /\d/];
            const input = TestHelper.render(<Input dataId={inputId} mask={mask} placeholder={placeholder}/>);

            expect(input.getDOMNode().placeholder).toEqual(placeholder);
        });

        test(' Control have mask without placeholder => Control have mask placeholder', () => {
            const input = TestHelper.render(<Input dataId={inputId} mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}/>);

            expect(input.getDOMNode().placeholder).toEqual('____-____');
        });

        test('Control with func mask and placeholder  => Control have placeholder', () => {
            const placeholder = "placeholder";
            const input = TestHelper.render(<Input dataId={inputId} mask={Input.getNumberMask()} placeholder={placeholder}/>);

            expect(input.getDOMNode().placeholder).toEqual(placeholder);
        });

        test(' Control have func mask without placeholder => Control have not mask placeholder', () => {
            const input = TestHelper.render(<Input dataId={inputId} mask={Input.getNumberMask()}/>);

            expect(input.getDOMNode().placeholder).not.toBePresent();
        });
    });

    describe('Test onChange', () => {
        test.skip('When enabled Input with mask => onChange fired with correct masked value', () => {
            const onChange = jest.fn();
            const newValue = 'value1';
            const maskedValue = '1';
            TestHelper.render(<Input type={inputType} value={newValue} onChange={onChange} dataId={inputId} mask={[/\d/]}/>);
            expect(onChange).toHaveBeenCalledWith(maskedValue);
        });

        test('When enabled Input => onChange fired', () => {
            const onChange = jest.fn();
            const newValue = 'New Value';
            const input = TestHelper.render(<Input type={inputType} onChange={onChange} dataId={inputId}/>);

            input.simulate('change', {target: {value: newValue}});
            expect(onChange).toHaveBeenCalledWith(newValue);
        });

        test('Check onChangeFocus', () => {
            const onFocusChange = jest.fn();
            const input = TestHelper.render(<Input type={inputType} onFocusChange={onFocusChange} dataId={inputId}/>);
            input.simulate('focus');
            expect(onFocusChange).toHaveBeenCalledWith(true);
            input.simulate('blur');
            expect(onFocusChange).toHaveBeenCalledWith(false);
        });

        test('When Input is disabled => onChange not fired', () => {
            const onChange = jest.fn();
            const newValue = 'New Value';
            const input = TestHelper.render(<Input type={inputType} disabled onChange={onChange} dataId={inputId}/>);

            input.simulate('change', {target: {inputElement: {value: newValue}}});
            expect(onChange).not.toBeCalled()
        });
    });

    describe('Test public methods', () => {
        test('Check focus', () => {
            const onFocusChange = jest.fn();
            const input = TestHelper.render(<Input type={inputType} onFocusChange={onFocusChange} dataId={inputId}/>);
            const inputInstance = input.instance();
            inputInstance.focus();
            expect(input.find('input')).toBeFocused();
        });
    })
});