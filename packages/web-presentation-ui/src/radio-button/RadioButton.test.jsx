import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import RadioButton from './index';

const radioButtonId = "radioButtonId";

describe('RadioButton', () => {
    describe('Test render', () => {

        test('Control default state checked', () => {
            const onChange= jest.fn();
            let radio = TestHelper.render(<RadioButton checked={true} onChange={onChange} dataId={radioButtonId}/>);

            expect(radio.hasClass('checked')).toEqual(true);
        });

        test('Control have not default state checked', () => {
            const onChange= jest.fn();
            let radio = TestHelper.render(<RadioButton onChange={onChange} dataId={radioButtonId}/>);

            expect(radio.hasClass('checked')).not.toEqual(true);
        });

        test('Check control`s identifier', () => {
            const onChange= jest.fn();
            let radio = TestHelper.render(<RadioButton onChange={onChange} dataId={radioButtonId}/>);

            expect(radio.find('.radio').prop('data-id')).toEqual(radioButtonId);
        });

        test('Change props checked ', () => {
            const checked = true;
            const onChange= jest.fn();
            let radio = TestHelper.render(<RadioButton onChange={onChange} dataId={radioButtonId}/>);
            expect(radio.hasClass('checked')).toEqual(false);

            radio.setProps({checked});

            expect(radio.hasClass('checked')).toEqual(true);
        });
        test('Check tabIndex value ', () => {
            const onChange= jest.fn();
            const tabIndex = 2;
            let radio = TestHelper.render(<RadioButton onChange={onChange} dataId={radioButtonId} tabIndex={tabIndex}/>);

            expect(radio.find('.radio').getDOMNode().tabIndex).toEqual(tabIndex);
        });
    });

    describe('Test onChange', () => {
        test('When RadioButton is enabled  => onChange fired', () => {
            const onChange = jest.fn();
            const changeState = false;
            let radio = TestHelper.render(<RadioButton checked onChange={onChange} dataId={radioButtonId}/>);

            radio.find('input').simulate('change', { target: { checked: changeState } });
            expect(onChange).toHaveBeenCalledWith(changeState);
        });

        test('When Checkbox is disabled  => onChange not fired', () => {
            const onChange = jest.fn();
            const changeState = false;
            let radio = TestHelper.render(<RadioButton disabled onChange={onChange} dataId={radioButtonId}/>);

            radio.find('input').simulate('change', { target: { checked: changeState } });
            expect(onChange).not.toBeCalled()
        });
    });

});