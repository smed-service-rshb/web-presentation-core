import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import Toggle from './index';

const toggleId = "toggle1";

describe('Toggle', () => {
    describe('Test render', () => {

        test('Check empty description  => Control have not description', () => {
            const onChange= jest.fn();

            let toggle = TestHelper.render(<Toggle onChange={onChange} dataId={toggleId}/>);
            expect(toggle.find('.toggleLabel').exists()).toEqual(false);
        });

        test('Check description  => Control have description', () => {
            const onChange= jest.fn();
            const description = 'Описание переключателя';

            let toggle = TestHelper.render(<Toggle description={description} onChange={onChange} dataId={toggleId}/>);
            expect(toggle.find('.toggleLabel').exists()).toEqual(true);
            expect(toggle.find('.toggleLabel').text()).toEqual(description)
        });

        test('Control have default state checked', () => {
            const onChange= jest.fn();
            let toggle = TestHelper.render(<Toggle checked={true} onChange={onChange} dataId={toggleId}/>);

            expect(toggle.hasClass('checked')).toEqual(true);
        });

        test('Control have not default state checked', () => {
            const onChange= jest.fn();
            let toggle = TestHelper.render(<Toggle onChange={onChange} dataId={toggleId}/>);

            expect(toggle.hasClass('checked')).not.toEqual(true);
        });

        test('Control is checked  => Control have checked hint', () => {
            const onChange= jest.fn();
            const checkedHint = 'Да';
            let toggle = TestHelper.render(<Toggle checked={true} onChange={onChange} dataId={toggleId}/>);

            expect(toggle.find('.agree').text()).toEqual(checkedHint);
            expect(toggle.find('.disagree').exists()).toEqual(false);
        });

        test('Control is unchecked  => Control have unchecked hint', () => {
            const onChange= jest.fn();
            const uncheckedHint = 'Нет';
            let toggle = TestHelper.render(<Toggle onChange={onChange} dataId={toggleId}/>);

            expect(toggle.find('.disagree').text()).toEqual(uncheckedHint);
            expect(toggle.find('.agree').exists()).toEqual(false);
        });
        test('Check control`s identifier', () => {
            const onChange= jest.fn();
            let toggle = TestHelper.render(<Toggle onChange={onChange} dataId={toggleId}/>);

            expect(toggle.find('.toggle-target').prop('data-id')).toEqual(toggleId);
        });

        test('Change props checked ', () => {
            const checked = true;
            const onChange= jest.fn();
            let checkbox = TestHelper.render(<Toggle onChange={onChange} dataId={toggleId}/>);
            expect(checkbox.hasClass('checked')).toEqual(false);

            checkbox.setProps({checked});

            expect(checkbox.hasClass('checked')).toEqual(true);
        });

        test('Check tabIndex value ', () => {
            const tabIndex = 2;
            const onChange= jest.fn();
            let toggle = TestHelper.render(<Toggle onChange={onChange} dataId={toggleId} tabIndex={tabIndex}/>);

            expect(toggle.find('.toggle-target').getDOMNode().tabIndex).toEqual(tabIndex);
        });
    });

    describe('Test onChange', () => {
        test('When Toggle is enabled  => onChange fired', () => {
            const onChange = jest.fn();
            const changeState = false;
            let toggle = TestHelper.render(<Toggle checked onChange={onChange} dataId={toggleId}/>);

            toggle.find('input').simulate('change', { target: { checked: changeState } });
            expect(onChange).toHaveBeenCalledWith(changeState);
        });

        test('When Toggle is disabled  => onChange not fired', () => {
            const onChange = jest.fn();
            const changeState = false;
            let toggle = TestHelper.render(<Toggle disabled onChange={onChange} dataId={toggleId}/>);

            toggle.find('input').simulate('change', { target: { checked: changeState } });
            expect(onChange).not.toBeCalled()
        });
    });

});