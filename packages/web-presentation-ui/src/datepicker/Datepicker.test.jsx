import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import Datepicker from './index';
import Button from '../button/index.js'
import moment from 'moment';
import {months} from './common/DatepickerCommon';


const value = '07.07.2007';
const onChangeEmpty = () => {};

function getFormatedDate (value) {
    let _d = value ? moment(value, 'DD.MM.YYYY', true) :moment();
    let date = {
        day: _d.format('D'),
        month: months.ru[_d.month()],
        year: _d.format('YYYY')
    };
    return date;

}

const datepickerId = "datepickerId";

describe('Datepicker', () => {
    describe('Test render', () => {
        test('Value', () => {
            const value = '07.08.2009';
            let datepicker = TestHelper.render(<Datepicker value={value} onChange={onChangeEmpty} dataId={datepickerId}/>);
            let date = getFormatedDate(value);

            expect(datepicker.find('.DayPicker-Day--selected').text()).toEqual(date.day);
            expect(datepicker.find('#month').text()).toEqual(date.month);
            expect(datepicker.find('#year').text()).toEqual(date.year);
        });

        test('Empty value', () => {
            let datepicker = TestHelper.render(<Datepicker onChange={onChangeEmpty} dataId={datepickerId}/>);
            let date = getFormatedDate();

            expect(datepicker.find('.DayPicker-Day--today').text()).toEqual(date.day);
            expect(datepicker.find('#month').text()).toEqual(date.month);
            expect(datepicker.find('#year').text()).toEqual(date.year);
        });

        test('Control have default button', () => {
            let datepicker = TestHelper.render(<Datepicker onChange={onChangeEmpty} dataId={datepickerId}/>);

            let buttons = datepicker.find('.datepicker-buttons').find(Button);
            expect(buttons.props().name).toEqual('Сегодня');
        });
        test('Check control`s identifier', () => {
            let datepicker = TestHelper.render(<Datepicker onChange={onChangeEmpty} dataId={datepickerId}/>);

            expect(datepicker.find('.calendar-container').prop('data-id')).toEqual(datepickerId);
        });
    });

    describe('Test onChange', () => {
        test('Select day', () => {
            const onChange= jest.fn();
            let datepicker = TestHelper.render(<Datepicker value={value} onChange={onChange} dataId={datepickerId}/>);

            datepicker.find('.DayPicker-Day').last().simulate('click');
            expect(onChange).toHaveBeenCalledWith('05.08.2007');
        });
    });

    describe('Test buttons work', () => {
        test('Select today button', () => {
            const onChange= jest.fn();
            let datepicker = TestHelper.render(<Datepicker onChange={onChange} dataId={datepickerId}/>);

            datepicker.find('.button-secondary').simulate('click');

            expect(onChange).toHaveBeenCalledWith(moment().format('DD.MM.YYYY'));
        });
    });
});
