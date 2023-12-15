import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import InputDatepicker from './index';
import Datepicker from '../datepicker';
import Input from '../input'
import Button from "../button";

const value = '07.07.2007';
const onChangeEmpty = () => {
};
const datepickerId = "datepickerId";

const INPUT_SELECTOR = 'input.input';

describe('InputDatepicker', () => {
    describe('Test render', () => {
        test('Value', () => {
            const inputDatepicker = TestHelper.render(<InputDatepicker value={value} show onChange={onChangeEmpty}
                                                                       dataId={datepickerId}/>);

            expect(inputDatepicker.find('input')).not.toBeFocused();
            expect(inputDatepicker.find(Datepicker).props().value).toEqual(value);
            expect((inputDatepicker.find(INPUT_SELECTOR).getDOMNode().tabIndex)).toEqual(0);
        });

        test('Empty value', () => {
            const tabIndex = 1;
            const maskPlaceholder = "__.__.____";
            const inputDatepicker = TestHelper.render(<InputDatepicker tabIndex={tabIndex} show onChange={onChangeEmpty}
                                                                       dataId={datepickerId}/>);

            expect(inputDatepicker.find(Datepicker).props().value).not.toBeDefined();
            const domNode = inputDatepicker.find(INPUT_SELECTOR).getDOMNode();
            expect((domNode.tabIndex)).toEqual(tabIndex);
            expect((domNode.placeholder)).toEqual(maskPlaceholder);
        });

        test('Focus input => Datepicker not exist', () => {
            const onChange = jest.fn();
            const inputDatepicker = TestHelper.render(<InputDatepicker onChange={onChange} dataId={datepickerId}/>);

            inputDatepicker.find(INPUT_SELECTOR).simulate('focus');
            expect(inputDatepicker.find(Datepicker)).not.toBePresent();
        });

        test('Click icon => input not focus and datepicker exist', () => {
            const inputDatepicker = TestHelper.render(<InputDatepicker value={value} onChange={onChangeEmpty}
                                                                       dataId={datepickerId}/>);

            inputDatepicker.find('.datepicker-icon').simulate('click');
            expect(inputDatepicker.find('input')).not.toBeFocused();
            expect(inputDatepicker.find(Datepicker)).toBePresent();
        });

        test('Show is true', () => {
            const inputDatepicker = TestHelper.render(<InputDatepicker value={value} show onChange={onChangeEmpty}
                                                                     dataId={datepickerId}/>);

            expect(inputDatepicker.find(Datepicker)).toBePresent();
        });

        test('Disabled and show are true=> Datepicker not exists', () => {
            const inputDatepicker = TestHelper.render(<InputDatepicker value={value} disabled show
                                                                     onChange={onChangeEmpty} dataId={datepickerId}/>);

            expect(inputDatepicker.find(Datepicker)).not.toBePresent();
        });

        test('inputDatepicker type disabled', () => {
            const inputDatepicker = TestHelper.render(<InputDatepicker value={value} disabled show
                                                                     onChange={onChangeEmpty} dataId={datepickerId}/>);

            inputDatepicker.find('.datepicker-icon').simulate('click');
            expect(inputDatepicker.find('.datepicker-overlay')).not.toBePresent();
        });

        test('Show datepicker and click datepicker-background => show is false', () => {
            const inputDatepicker = TestHelper.render(<InputDatepicker value={value} show onChange={onChangeEmpty}
                                                                     dataId={datepickerId}/>);

            inputDatepicker.find('.datepicker-background').simulate('click');
            expect(inputDatepicker.find(Datepicker)).not.toBePresent();
        });

        test('Check control`s identifier', () => {
            const onChange = jest.fn();
            const inputDatepicker = TestHelper.render(<InputDatepicker onChange={onChange} dataId={datepickerId}/>);

            expect(inputDatepicker.find('.relative').at(0).prop('data-id')).toEqual(datepickerId);
            expect(inputDatepicker.find('.datepicker-icon').prop('data-id')).toEqual(datepickerId + '-icon');
            expect(inputDatepicker.find(Input).prop('dataId')).toEqual(datepickerId + '-input');
        });

        test('Check open calendar identifier', () => {
            const onChange = jest.fn();
            const inputDatepicker = TestHelper.render(<InputDatepicker show onChange={onChange} dataId={datepickerId}/>);

            expect(inputDatepicker.find(Input).prop('dataId')).toEqual(datepickerId + '-input');
        });
    });


    describe('Test onChange', () => {
        test('Select day', () => {
            const onChange = jest.fn();
            const date = '05.08.2007';
            const inputDatepicker = TestHelper.render(<InputDatepicker show value={value} onChange={onChange}
                                                                     dataId={datepickerId}/>);

            inputDatepicker.find('.DayPicker-Day').last().simulate('click');
            expect(onChange).toHaveBeenCalledWith(date);
        });

        test.skip('Select day by input', () => {
            const onChange = jest.fn();
            const date = '11.11.2011';
            const inputDatepicker = TestHelper.render(<InputDatepicker value={value} onChange={onChange}
                                                                     dataId={datepickerId}/>);

            inputDatepicker.find(Input).simulate('change', {target: {value: date}});
            expect(onChange).toHaveBeenCalledWith(date);
        });

        test('Disabled is true => onChange not fired', () => {
            const onChange = jest.fn();
            const date = '11.11.2011';
            const inputDatepicker = TestHelper.render(<InputDatepicker value={value} disabled onChange={onChange}
                                                                     dataId={datepickerId}/>);

            inputDatepicker.find(Input).simulate('change', {target: {value: date}});
            expect(onChange).not.toBeCalled();
        });

        test('Select date by datepicker => Datepicker not exists', () => {
            const onChange = jest.fn();
            const inputDatepicker = TestHelper.render(<InputDatepicker value={value} onChange={onChange}
                                                                     dataId={datepickerId} show/>);

            inputDatepicker.find(Datepicker).find('.DayPicker-Day').last().simulate('click');
            expect(inputDatepicker.find(Datepicker)).not.toBePresent();
            expect(onChange).toBeCalled();
        });

        test('Select today datepicker => Datepicker not exists', () => {
            const onChange = jest.fn();
            const inputDatepicker = TestHelper.render(<InputDatepicker value={value} onChange={onChange}
                                                                     dataId={datepickerId} show/>);

            inputDatepicker.find(Datepicker).find('.datepicker-buttons').find(Button).simulate('click');
            expect(inputDatepicker.find(Datepicker)).not.toBePresent();
            expect(onChange).toBeCalled();
        });

        test('Select date datepicker => input is active element', () => {
            const onChange = jest.fn();
            const inputDatepicker = TestHelper.render(<InputDatepicker value={value} onChange={onChange}
                                                                     dataId={datepickerId} show/>);

            inputDatepicker.find(Datepicker).find('.DayPicker-Day').last().simulate('click');
            expect(inputDatepicker.find('input')).toBeFocused();
            expect(onChange).toBeCalled();
        });

        test('focus and unblur input => onInputFocusChange(true) and onInputFocusChange(false)', () => {
            const onInputFocusChange = jest.fn();
            const inputDatepicker = TestHelper.render(<InputDatepicker value={value} onChange={onChangeEmpty}
                                                                     dataId={datepickerId}
                                                                     onInputFocusChange={onInputFocusChange}/>);

            inputDatepicker.find(Input).simulate('focus');
            expect(onInputFocusChange).toBeCalledWith(true);
            inputDatepicker.find(Input).simulate('blur');
            expect(onInputFocusChange).toBeCalledWith(false);
        });
    });
});
