import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import FilterPeriod from './index';
import InputDatepicker from '../datepicker-input/index';
import Button from '../button/index';
import moment from 'moment';

const dataId = 'dataId';

describe('FilterPeriod', () => {
    describe('Test render', () => {
        const onChange = jest.fn();

        test('Render control ', () => {
            const lastMonth = "За последний месяц";
            const period = "За период";
            const tabIndex = 0;
            const defaultValue = "";
            const filterPeriod = TestHelper.render(<FilterPeriod onChange={onChange} dataId={dataId}/>);

            expect(filterPeriod.exists()).toEqual(true);
            expect(filterPeriod.find('.period-filter-tab-last-month .period-filter-tab-text').text()).toEqual(lastMonth);
            expect(filterPeriod.find('.period-filter-tab-date .period-filter-tab-text').text()).toEqual(period);
            expect(filterPeriod.find('.period-filter-tab-last-month').hasClass('active')).toEqual(true);

            filterPeriod.find('.period-filter-tab-date').simulate('click');

            expect(filterPeriod.find('.period-filter-tab-dates-start input.input').props().defaultValue).toEqual(defaultValue);
            expect(filterPeriod.find('.period-filter-tab-dates-end input.input').props().defaultValue).toEqual(defaultValue);

            expect(filterPeriod.find('.period-filter-tab-last-month').getDOMNode().tabIndex).toEqual(tabIndex);
            expect(filterPeriod.find('.period-filter-tab-date').getDOMNode().tabIndex).toEqual(tabIndex);
        });
        test('Check control`s identifiers ', () => {
            const filterPeriod = TestHelper.render(<FilterPeriod onChange={onChange} dataId={dataId}/>);

            filterPeriod.find('.period-filter-tab-date').simulate('click');

            expect(filterPeriod.find('.period-filter').prop('data-id')).toEqual(dataId);
            expect(filterPeriod.find('.period-filter-tab-last-month').prop('data-id')).toEqual(`month-${dataId}`);
            expect(filterPeriod.find('.period-filter-tab-date').prop('data-id')).toEqual(`period-${dataId}`);
            expect(filterPeriod.find('.period-filter-tab-dates-start').find(InputDatepicker).prop('dataId')).toEqual(`period-start-${dataId}`);
            expect(filterPeriod.find('.period-filter-tab-dates-end').find(InputDatepicker).prop('dataId')).toEqual(`period-end-${dataId}`);
            expect(filterPeriod.find('.buttons').prop('data-id')).toEqual(`button-${dataId}`);
        });
        test('Control have preset start date => Control will render with start day', () => {
            const start = '01.09.2017';
            const defaultValue = "";
            const filterPeriod = TestHelper.render(<FilterPeriod onChange={onChange} dataId={dataId} start={start}/>);

            filterPeriod.find('.period-filter-tab-date').simulate('click');

            expect(filterPeriod.find('.period-filter-tab-date').hasClass('active')).toEqual(true);
            expect(filterPeriod.find('.period-filter-tab-last-month').hasClass('active')).toEqual(false);
            expect(filterPeriod.find('.period-filter-tab-dates-start input.input').props().defaultValue).toEqual(start);
            expect(filterPeriod.find('.period-filter-tab-dates-end input.input').props().defaultValue).toEqual(defaultValue);
        });
        test('Control have preset end date => Control will render with end date', () => {
            const end = '20.09.2017';
            const defaultValue = "";
            const filterPeriod = TestHelper.render(<FilterPeriod onChange={onChange} dataId={dataId} end={end}/>);

            filterPeriod.find('.period-filter-tab-date').simulate('click');

            expect(filterPeriod.find('.period-filter-tab-dates-start input.input').props().defaultValue).toEqual(defaultValue);
            expect(filterPeriod.find('.period-filter-tab-dates-end input.input').props().defaultValue).toEqual(end);
        });
        test('Control have preset start and end dates => Control will render with start and end dates', () => {
            const start = '01.09.2017';
            const end = '20.09.2017';
            const filterPeriod = TestHelper.render(<FilterPeriod onChange={onChange} dataId={dataId} start={start} end={end}/>);

            filterPeriod.find('.period-filter-tab-date').simulate('click');

            expect(filterPeriod.find('.period-filter-tab-dates-start input.input').props().defaultValue).toEqual(start);
            expect(filterPeriod.find('.period-filter-tab-dates-end input.input').props().defaultValue).toEqual(end);
        });
    });
    describe('Test onChange', () => {
        test('When click on active element => onChange won`t fired', () => {
            const onChange = jest.fn();
            const filterPeriod = TestHelper.render(<FilterPeriod onChange={onChange} dataId={dataId}/>);

            filterPeriod.find('.period-filter-tab-last-month').simulate('click');

            expect(onChange).not.toBeCalled()
        });
        test('When click on inactive element => onChange will be fired', () => {
            const onChange = jest.fn();
            const start = moment().subtract(1, 'months').format('DD.MM.YYYY');
            const end = moment().format('DD.MM.YYYY');
            const filterPeriod = TestHelper.render(<FilterPeriod onChange={onChange} dataId={dataId}/>);

            filterPeriod.find('.period-filter-tab-date').simulate('click');
            filterPeriod.find('.period-filter-tab-last-month').simulate('click');

            expect(onChange).toHaveBeenCalledWith({start, end})
        });
        test('Click on button when control have full period => onChange will be fired with dates', () => {
            const onChange = jest.fn();
            const start = '01.09.2017';
            const end = '20.09.2017';
            const filterPeriod = TestHelper.render(<FilterPeriod onChange={onChange} dataId={dataId} start={start} end={end}/>);

            filterPeriod.find('.period-filter-tab-date').simulate('click');
            filterPeriod.find(Button).simulate('click');

            expect(onChange).toHaveBeenCalledWith({start, end});
        });
        test('Check Enter button press event', () => {
            const onChange = jest.fn();
            const start = '01.09.2017';
            const end = '20.09.2017';
            const filterPeriod = TestHelper.render(<FilterPeriod onChange={onChange} dataId={dataId} start={start} end={end}/>);

            filterPeriod.find('.period-filter-tab-date').simulate("keyPress", { which: 13 });
            expect(filterPeriod.find('.period-filter-tab-dates')).toBePresent();

            filterPeriod.find('.period-filter-tab-last-month').simulate("keyPress", { which: 13 });
            expect(filterPeriod.find('.period-filter-tab-dates')).not.toBePresent();
        });
        test('Check Backspace button press event', () => {
            const onChange = jest.fn();
            const start = '01.09.2017';
            const end = '20.09.2017';
            const filterPeriod = TestHelper.render(<FilterPeriod onChange={onChange} dataId={dataId} start={start} end={end}/>);

            filterPeriod.find('.period-filter-tab-date').simulate("keyPress", { which: 32 });
            expect(filterPeriod.find('.period-filter-tab-dates')).toBePresent();

            filterPeriod.find('.period-filter-tab-last-month').simulate("keyPress", { which: 32 });
            expect(filterPeriod.find('.period-filter-tab-dates')).not.toBePresent();
        });
    });
});
