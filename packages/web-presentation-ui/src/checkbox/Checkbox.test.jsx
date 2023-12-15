import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import Checkbox from './index';

const checkboxId = "CheckboxId";

describe('Checkbox', () => {
    describe('Test render', () => {

        test('Check empty description  => Control have not description', () => {
            const onChange= jest.fn();

            let checkbox = TestHelper.render(<Checkbox onChange={onChange} dataId={checkboxId}/>);
            expect(checkbox.find('.checkbox-label').exists()).toEqual(false);
        });

        test('Check description  => Control have description', () => {
            const onChange= jest.fn();
            const description = 'Описание checkbox';

            let checkbox = TestHelper.render(<Checkbox description={description} onChange={onChange} dataId={checkboxId}/>);
            expect(checkbox.find('.checkbox-label').exists()).toEqual(true);
            expect(checkbox.find('.checkbox-label').text()).toEqual(description)
        });

        test('Control default state checked', () => {
            const onChange= jest.fn();
            let checkbox = TestHelper.render(<Checkbox checked={true} onChange={onChange} dataId={checkboxId}/>);

            expect(checkbox.hasClass('checked')).toEqual(true);
        });

        test('Control have not default state checked', () => {
            const onChange= jest.fn();
            let checkbox = TestHelper.render(<Checkbox onChange={onChange} dataId={checkboxId}/>);

            expect(checkbox.hasClass('checked')).not.toEqual(true);
        });

        test('Check control`s identifier', () => {
            const onChange= jest.fn();
            let checkbox = TestHelper.render(<Checkbox onChange={onChange} dataId={checkboxId}/>);

            expect(checkbox.find('.checkbox').prop('data-id')).toEqual(checkboxId);
        });

        test('Change props checked ', () => {
            const checked = true;
            const onChange= jest.fn();
            let checkbox = TestHelper.render(<Checkbox onChange={onChange} dataId={checkboxId}/>);
            expect(checkbox.hasClass('checked')).toEqual(false);

            checkbox.setProps({checked});

            expect(checkbox.hasClass('checked')).toEqual(true);
        });
        test('Check tabIndex value ', () => {
            const onChange= jest.fn();
            const tabIndex = 2;
            let checkbox = TestHelper.render(<Checkbox onChange={onChange} dataId={checkboxId} tabIndex={tabIndex}/>);

            expect(checkbox.find('.checkbox').getDOMNode().tabIndex).toEqual(tabIndex);
        });
    });

    describe('Test onChange', () => {
        test('When Checkbox is enabled  => onChange fired', () => {
            const onChange = jest.fn();
            const changeState = false;
            let checkbox = TestHelper.render(<Checkbox checked onChange={onChange} dataId={checkboxId}/>);

            checkbox.find('input').simulate('change', { target: { checked: changeState } });
            expect(onChange).toHaveBeenCalledWith(changeState);
        });

        test('When Checkbox is disabled  => onChange not fired', () => {
            const onChange = jest.fn();
            const changeState = false;
            let checkbox = TestHelper.render(<Checkbox disabled onChange={onChange} dataId={checkboxId}/>);

            checkbox.find('input').simulate('change', { target: { checked: changeState } });
            expect(onChange).not.toBeCalled()
        });
    });

});